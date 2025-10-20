import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
  Animated
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { predictGesture, resetScores } from './api';
import { determineWinner } from './gameLogic';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerMove, setPlayerMove] = useState(null);
  const [computerMove, setComputerMove] = useState(null);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 });
  const [debugImage, setDebugImage] = useState(null);
  const [countdown, setCountdown] = useState(null);
  
  const cameraRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleCapture = async () => {
    if (!cameraRef.current || loading) return;

    // Countdown
    setCountdown(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(null);

    setLoading(true);
    setResult(null);
    setPlayerMove(null);
    setComputerMove(null);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      const response = await predictGesture(photo.uri);

      if (response.player === 'none') {
        Alert.alert('No Hand Detected', 'Please show your hand gesture clearly');
        setLoading(false);
        return;
      }

      setPlayerMove(response.player);
      setComputerMove(response.computer);
      setResult(response.result);
      setScores(response.scores);
      
      if (response.debug_image_b64) {
        setDebugImage(`data:image/jpeg;base64,${response.debug_image_b64}`);
      }

      startShakeAnimation();
    } catch (error) {
      Alert.alert('Error', 'Failed to process image. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await resetScores();
      setScores(response.scores);
      setPlayerMove(null);
      setComputerMove(null);
      setResult(null);
      setDebugImage(null);
      Alert.alert('Success', 'Scores have been reset!');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset scores');
    }
  };

  const getEmoji = (move) => {
    const emojis = { rock: '✊', paper: '✋', scissors: '✌️', none: '❓' };
    return emojis[move] || '❓';
  };

  const getResultColor = () => {
    if (result === 'win') return '#4ade80';
    if (result === 'lose') return '#f87171';
    return '#fbbf24';
  };

  const getResultText = () => {
    if (result === 'win') return '🎉 You Win! 🎉';
    if (result === 'lose') return '😢 You Lose!';
    if (result === 'draw') return '🤝 Draw!';
    return 'Make Your Move!';
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00b4d8" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Text style={styles.subText}>Please enable camera permissions in settings</Text>
        <TouchableOpacity style={[styles.button, styles.playButton]} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rock Paper Scissors</Text>
        <Text style={styles.subtitle}>Show your gesture to the camera!</Text>
      </View>

      {/* Scores */}
      <View style={styles.scoresContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>You</Text>
          <Text style={styles.scoreValue}>{scores.player}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Draws</Text>
          <Text style={styles.scoreValue}>{scores.draws}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>AI</Text>
          <Text style={styles.scoreValue}>{scores.computer}</Text>
        </View>
      </View>

      {/* Camera or Debug View */}
      <View style={styles.cameraContainer}>
        {debugImage ? (
          <Image source={{ uri: debugImage }} style={styles.camera} resizeMode="cover" />
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
            onCameraReady={() => setCameraReady(true)}
          />
        )}
        
        {countdown && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}
      </View>

      {/* Result Display */}
      {result && (
        <Animated.View 
          style={[
            styles.resultContainer, 
            { 
              backgroundColor: getResultColor(),
              transform: [{ translateX: shakeAnim }]
            }
          ]}
        >
          <Text style={styles.resultText}>{getResultText()}</Text>
          <View style={styles.movesContainer}>
            <View style={styles.moveBox}>
              <Text style={styles.moveEmoji}>{getEmoji(playerMove)}</Text>
              <Text style={styles.moveLabel}>You</Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.moveBox}>
              <Text style={styles.moveEmoji}>{getEmoji(computerMove)}</Text>
              <Text style={styles.moveLabel}>AI</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.playButton, (loading || !cameraReady) && styles.buttonDisabled]}
          onPress={handleCapture}
          disabled={loading || !cameraReady}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {countdown ? countdown : '📸 Play'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>✊ Rock - Close fist</Text>
        <Text style={styles.instructionText}>✋ Paper - Open hand</Text>
        <Text style={styles.instructionText}>✌️ Scissors - Two fingers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b4d8',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  scoreBox: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  scoreLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 4,
  },
  scoreValue: {
    color: '#00b4d8',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraContainer: {
    height: height * 0.4,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  movesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveBox: {
    alignItems: 'center',
  },
  moveEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  moveLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  vsText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  playButton: {
    backgroundColor: '#00b4d8',
  },
  resetButton: {
    backgroundColor: '#e63946',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  instructionText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginVertical: 2,
  },
  errorText: {
    color: '#f87171',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#a0a0a0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});