# 🎮 Rock Paper Scissors AI - Mobile App

A real-time Rock Paper Scissors game built with React Native and AI-powered gesture detection. Play against the computer using your mobile camera to detect hand gestures!

## 📱 Demo & Access

### Try the App Now!

**🔗 Scan QR Code with Expo Go:**

1. Install **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Open Expo Go and scan the QR code below:

```
[QR CODE WILL BE GENERATED WHEN YOU RUN: npx expo start]
```

**Alternative:** [📹 Watch Walkthrough Video](https://www.loom.com/share/d8a4a77d696f47b1b51274e1189de837)

> **Note:** Make sure your phone and computer are on the **same WiFi network** to use the QR code method.

### 🎥 Video Walkthrough

A complete video demonstration showcasing:
- App installation via QR code scanning
- Camera permission granting
- Hand gesture detection in action (Rock, Paper, Scissors)
- Real-time gameplay with countdown
- Debug mode visualization with hand landmarks
- Score tracking across multiple rounds
- Result animations and UI interactions
- Common edge cases (no hand detected, unclear gestures)

**[► Watch the full walkthrough here](https://www.loom.com/share/d8a4a77d696f47b1b51274e1189de837)**

## ✨ Features

- **Real-time Gesture Detection**: Uses MediaPipe Hands for accurate hand gesture recognition
- **Camera Integration**: Front-facing camera captures your hand gestures
- **Instant Feedback**: See your gesture detected with confidence scores
- **Score Tracking**: Keep track of wins, losses, and draws
- **Debug Mode**: Visual feedback showing detected hand landmarks
- **Countdown Timer**: 3-2-1 countdown before capture for better preparation
- **Smooth Animations**: Shake animation on result display
- **Dark Modern UI**: Clean, intuitive interface with dark theme

## 🎯 How It Works

### Gesture Detection Approach

The app uses a Flask backend with **MediaPipe Hands** for real-time hand gesture detection:

1. **Camera Capture**: The mobile app captures a frame from the front camera
2. **Upload to Backend**: Image is sent to Flask server via HTTP POST
3. **Hand Detection**: MediaPipe detects hand landmarks (21 key points)
4. **Gesture Classification**: Custom algorithm analyzes finger positions:
   - **Rock** ✊: All fingers closed (0 extended fingers)
   - **Paper** ✋: All fingers open (4-5 extended fingers)
   - **Scissors** ✌️: Index and middle fingers extended (2 specific fingers)
5. **Computer Move**: Random selection from [rock, paper, scissors]
6. **Result Calculation**: Winner determined using game logic
7. **Response**: Result, moves, and debug image sent back to app

### Technical Details

- **Finger Extension Detection**: Compares tip, PIP, and MCP joint positions
- **Confidence Scoring**: Each gesture gets a confidence percentage (75-95%)
- **Edge Cases Handled**: Partial gestures, unclear positions, no hand detected
- **Visual Debugging**: Landmarks drawn on image with color-coded connections
- **Base64 Image Transfer**: Debug images encoded and sent to mobile app

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **React Native** with Expo SDK 54
- **Expo Camera** for camera access
- **React Native Reanimated** for smooth animations
- **Dimensions API** for responsive design

### Backend (AI Server)
- **Flask** - Lightweight Python web framework
- **MediaPipe Hands** - Google's hand tracking solution
- **OpenCV** - Image processing
- **Pillow** - Image manipulation
- **NumPy** - Numerical computations

### Development Tools
- **Expo Go** - For instant testing on physical devices via QR code
- **Node.js & npm** - Package management
- **Python virtualenv** - Isolated Python environment

## 📋 Prerequisites

### System Requirements

#### Required Software Versions

**⚠️ IMPORTANT: Version Requirements**

- **Python 3.9 or higher** (Latest stable version recommended: Python 3.11+)
  - MediaPipe and OpenCV require Python 3.9+ for optimal compatibility
  - Check version: `python --version` or `python3 --version`
  - Download latest: [python.org/downloads](https://www.python.org/downloads/)
  
- **Node.js 18 LTS or higher** (Latest LTS recommended: Node.js 20+)
  - Expo SDK 54 requires Node.js 18+
  - Check version: `node --version`
  - Download latest LTS: [nodejs.org](https://nodejs.org/)
  
- **npm 9+ or yarn 1.22+** (comes with Node.js)
  - Check version: `npm --version`

**Why Latest Versions Matter:**
- **Python 3.11+**: Better performance, improved error messages, and full MediaPipe support
- **Node.js 18+**: Required for Expo SDK 54, improved module resolution, and better M1/M2 Mac compatibility
- **Security**: Latest versions include critical security patches
- **Compatibility**: Ensures all dependencies install correctly without conflicts

#### Version Verification

Run these commands to check your versions:

```bash
# Check Python version (should be 3.9+)
python --version
# or on some systems:
python3 --version

# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Check pip version
pip --version
# or
pip3 --version
```

**Example Output:**
```
Python 3.11.5
Node v20.10.0
npm 10.2.3
pip 23.3.1
```

### For Mobile Testing (Quick Start)
- **Smartphone** (iOS 13+ or Android 8.0+)
- **Expo Go app** installed (latest version from app store)
- **Same WiFi network** as the backend server

### For Full Development Setup
- **Python 3.9+** (3.11+ recommended) with pip
- **Node.js 18 LTS+** (20 LTS recommended) with npm
- **Expo CLI** (`npm install -g expo-cli`)
- **Git** for version control
- **Text Editor/IDE** (VS Code, PyCharm, etc.)
- **Stable internet connection** for initial dependency installation

### Optional but Recommended
- **Python virtual environment tool** (venv, virtualenv, or conda)
- **watchman** for better file watching on macOS/Linux: `brew install watchman`
- **Android Studio** (for Android emulator testing)
- **Xcode** (for iOS simulator testing - macOS only)

### Updating to Latest Versions

**Update Python:**
```bash
# macOS (using Homebrew)
brew update
brew upgrade python

# Windows (download from python.org or use Microsoft Store)
# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install python3.11

# Verify installation
python3 --version
```

**Update Node.js:**
```bash
# Using nvm (Node Version Manager) - Recommended
nvm install --lts
nvm use --lts

# macOS (using Homebrew)
brew update
brew upgrade node

# Windows (download installer from nodejs.org)
# Or use nvm-windows: https://github.com/coreybutler/nvm-windows

# Verify installation
node --version
npm --version
```

**Update npm:**
```bash
npm install -g npm@latest
```

## 🚀 Quick Start (Using QR Code)

### For Users/Testers:

1. **Install Expo Go** on your phone
2. **Scan the QR code** (provided in demo section or from terminal)
3. **Allow camera permissions** when prompted
4. **Start playing!** The backend is already running

### For Developers:

Follow the complete setup instructions below.

## 🔧 Complete Setup Instructions

### 0. Verify Prerequisites

Before starting, ensure you have the correct versions:

```bash
# Check Python version (must be 3.9+, preferably 3.11+)
python3 --version

# Check Node.js version (must be 18+, preferably 20+)
node --version

# Check npm version
npm --version
```

If any version is outdated, refer to the "Updating to Latest Versions" section above.

### 1. Clone the Repository

```bash
git clone https://github.com/abhiforgithonly/rockpaperscissor_mobile.git
cd rockpaperscissor_mobile
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Upgrade pip to latest version
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

The backend will start on `http://0.0.0.0:5000`

**Important**: Note your computer's local IP address. On terminal you'll see:
```
Starting Flask server on http://0.0.0.0:5000
```

Find your local IP:
- **Windows**: `ipconfig` → Look for "IPv4 Address" on Command Prompt
- **Mac/Linux**: `ifconfig` or `ip addr` → Look for "inet" under your WiFi interface
- Example: `192.168.1.38`

### 3. Frontend Setup

```bash
cd ../frontend  # or root directory if React Native files are there

# Install dependencies (with legacy peer deps for compatibility)
npm install --legacy-peer-deps
npm install expo@latest --legacy-peer-deps
npm install react-native-worklets react-native-reanimated --legacy-peer-deps

# Update API endpoint
# Edit api.js and replace API_BASE_URL with your backend IP:
# const API_BASE_URL = 'http://YOUR_LOCAL_IP:5000';
# Example: const API_BASE_URL = 'http://192.168.1.38:5000';

# Start Expo development server
npx expo start
```

### 4. Connect via QR Code

1. **Expo will display a QR code** in your terminal
2. **Open Expo Go** on your phone
3. **Scan the QR code**:
   - **iOS**: Use the built-in Camera app, tap the Expo Go notification
   - **Android**: Use the QR scanner inside the Expo Go app
4. **App will load** on your device (first load may take 30-60 seconds)

**Important**: Ensure your phone and computer are on the **same WiFi network**!

### Alternative: Run on Emulator
- **iOS**: Press `i` in terminal (requires Xcode on Mac)
- **Android**: Press `a` in terminal (requires Android Studio)

## 📦 Project Structure

```
rock-paper-scissors-ai/
├── backend/
│   ├── app.py                 # Flask server with routes
│   ├── gesture_utils.py       # MediaPipe gesture detection logic
│   ├── game_state.py          # Game state management (future use)
│   ├── requirements.txt       # Python dependencies
│   └── leaderboard.json       # Persistent leaderboard data (future)
│
├── frontend/
│   ├── App.js                 # Main app component
│   ├── GameScreen.js          # Game UI and logic
│   ├── api.js                 # API calls to backend
│   ├── gameLogic.js           # Game rules and utilities
│   ├── app.json               # Expo configuration
│   └── package.json           # Node dependencies
│
└── README.md                  # This file
```

## 🎮 How to Play

1. **Grant Camera Permission**: Allow camera access when prompted
2. **Position Your Hand**: Hold your hand in front of the front-facing camera
3. **Make Your Gesture**:
   - ✊ **Rock**: Make a fist (close all fingers)
   - ✋ **Paper**: Open your hand flat (all fingers extended)
   - ✌️ **Scissors**: Show peace sign (index + middle fingers only)
4. **Tap "📸 Play"**: A 3-2-1 countdown will start
5. **Hold Still**: Camera captures your gesture at countdown end
6. **See Results**: View your move, computer's move, and winner with animation
7. **Reset Scores**: Tap "🔄 Reset" to clear all scores
8. **Play Again**: Tap "📸 Play" for another round

### Pro Tips:
- Use **good lighting** for better detection
- Hold gesture **steady** during countdown
- Make gestures **clear and distinct**
- Keep hand **centered** in camera frame
- Check **debug image** to see what AI detected

## 🐛 Debugging & Troubleshooting

### Version-Related Issues

**"Module not found" or "Cannot find module" errors:**
```bash
# Update Node.js to latest LTS
nvm install --lts
nvm use --lts

# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Python dependency installation failures:**
```bash
# Upgrade pip first
pip install --upgrade pip

# If MediaPipe fails to install, ensure Python 3.9+
python3 --version

# Try installing with verbose output to see errors
pip install -r requirements.txt --verbose

# On macOS M1/M2, you might need:
pip install --upgrade pip setuptools wheel
```

**"Python version not supported" error:**
- MediaPipe requires Python 3.9+
- Download latest Python from [python.org](https://www.python.org/downloads/)
- After installing, create new virtual environment with correct version

**Expo CLI compatibility issues:**
```bash
# Update Expo CLI globally
npm install -g expo-cli@latest

# Or use npx to always use latest
npx expo start
```

### QR Code Connection Issues
- **Cannot Scan QR Code**: 
  - Ensure Expo Go is installed and updated to latest version
  - Try using the manual connection: In Expo Go, tap "Enter URL manually" and type the URL shown in terminal
- **Connection Timeout**:
  - Verify both devices are on **same WiFi network**
  - Check if firewall is blocking port 8081
  - Try restarting Expo with: `npx expo start -c`
- **"Something went wrong"**:
  - Close Expo Go completely and reopen
  - Restart the Expo dev server
  - Clear cache: `npx expo start -c`

### Camera Issues
- **Permission Denied**: 
  - Go to phone Settings → Apps → Expo Go → Permissions → Enable Camera
  - Restart Expo Go after enabling
- **Black Screen**: 
  - Ensure you're using front camera
  - Check lighting conditions
  - Grant camera permissions
- **Frozen Camera**: 
  - Close and reopen the app
  - Restart Expo Go

### Backend Connection Issues
- **"Cannot Connect to Backend"**: 
  - Verify backend is running: `python app.py`
  - Check firewall settings (allow port 5000)
  - Ensure device and computer are on **same WiFi network**
  - Update `API_BASE_URL` in `api.js` with correct IP address
  - Test backend locally: Visit `http://localhost:5000` in browser
  - Check if backend IP changed (WiFi reconnection can change IP)

### Gesture Detection Issues
- **"No Hand Detected"**: 
  - Improve lighting conditions (avoid backlighting)
  - Move hand closer to camera
  - Ensure hand is clearly visible and not cut off
  - Clean camera lens
  - Hold hand steadier
- **Wrong Gesture Detected**:
  - Make gestures more distinct and exaggerated
  - Hold gesture steady during countdown
  - Check debug image to see detected landmarks
  - Ensure fingers are clearly extended or closed
  - Avoid partial gestures (e.g., slightly bent fingers)
  - Try adjusting hand angle

### Debug Mode Visualization
The backend returns a debug image showing:
- **Green dots**: Hand landmarks (21 points)
- **Yellow lines**: Hand connections/skeleton
- **Top-left text**: Detected gesture with confidence score
- **Finger count**: Shows X/5 fingers detected

Use this to understand what the AI is seeing and adjust your gestures accordingly.

### Common Fixes
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Clear Expo cache
npx expo start -c

# Restart backend with clean environment
deactivate  # Exit virtual environment
rm -rf venv  # Remove old venv
python3 -m venv venv  # Create new venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python app.py

# Check if backend is running
curl http://localhost:5000
# or visit in browser
```

### Still Having Issues?
1. **Verify all version requirements** (Python 3.9+, Node.js 18+)
2. Check all prerequisites are installed correctly
3. Verify WiFi network is the same for both devices
4. Try restarting both backend and frontend
5. Check terminal for error messages
6. Ensure no VPN is active (can block local network access)
7. Update all tools to latest versions: `npm update -g`, `pip install --upgrade pip`

## 🔧 Configuration Options

### Backend (`app.py`)
```python
TEST_MODE = False  # Set to True to make computer copy your move (for testing gestures)
```

### Gesture Detection Sensitivity (`gesture_utils.py`)
```python
min_detection_confidence=0.6  # Lower = more sensitive (range: 0.3-0.8)
min_tracking_confidence=0.6   # Hand tracking stability
```

### API Endpoint (`api.js`)
```javascript
const API_BASE_URL = 'http://192.168.1.38:5000';  // Update with your computer's IP
```

## 💡 Future Improvements

### Suggested Enhancements

1. **Live Real-Time Mode** (Like IRL Rock Paper Scissors)
   - Remove countdown and capture button
   - Continuous camera feed analysis (30fps)
   - Both players show gesture simultaneously
   - "Rock, Paper, Scissors, Shoot!" audio countdown
   - Freeze frame on "Shoot" and determine winner instantly
   - Implementation: WebSocket connection for real-time streaming
   - Reduced latency (<200ms response time)

2. **Multiplayer Mode**
   - Play against friends online
   - Room codes for matchmaking (6-digit codes)
   - Live leaderboard with global rankings
   - Real-time game state synchronization
   - Chat feature during matches

3. **Advanced AI Opponent with Predictive Intelligence**
   
   **Pattern Recognition & Learning:**
   - **Move History Analysis**: Track last 10-20 moves to identify patterns
   - **Frequency Counter**: Detect which gesture player uses most often
   - **Sequence Detection**: Identify common patterns (e.g., Rock → Paper → Scissors rotation)
   - **Win/Loss Response Tracking**: Learn how player reacts after winning or losing
   - **Time-Based Patterns**: Detect if player behavior changes over time or game duration
   
   **Predictive Algorithms:**
   - **Markov Chain Model**: Predict next move based on transition probabilities
     - Example: If player threw Rock → Paper 70% of the time, AI expects Paper
   - **Anti-Pattern Strategy**: Counter player's most frequent move
     - If player uses Rock 60% of the time, AI uses Paper more often
   - **Psychological Modeling**: 
     - Players tend to avoid repeating same move 3+ times (exploit this)
     - After losing, players often switch to gesture that would've won
     - After winning, players tend to stick with winning gesture
   - **N-Gram Analysis**: Look at sequences of N moves to predict next one
     - Trigram: If last 3 moves were [Rock, Paper, Rock], predict next
   
   **Difficulty Levels:**
   - **Easy (Random)**: Pure random selection - 33% win rate for AI
   - **Medium (Basic Pattern)**: Tracks last 5 moves, counters most frequent
   - **Hard (Advanced Pattern)**: Uses Markov chains + psychological tells
   - **Impossible (Predictive ML)**:
     - Neural network trained on player's game history
     - Real-time adaptation during match
     - 60-70% AI win rate against human patterns
     - Includes deliberate "mistakes" to seem human-like
   
   **Machine Learning Integration:**
   - **Reinforcement Learning**: AI learns optimal strategy over time
   - **Clustering**: Group players by play style (aggressive, defensive, random)
   - **Transfer Learning**: Apply patterns learned from global player base
   - **Online Learning**: Model updates with each game played
   
   **Implementation Approach:**
   ```
   Player History: [R, P, S, R, R, P, S, P, P, R]
   
   Analysis:
   - Rock frequency: 40%
   - Paper frequency: 40%  
   - Scissors frequency: 20%
   - Most common transition: R→P (50%)
   - Current streak: 2 consecutive losses
   
   Prediction Logic:
   1. Player likely to use Paper (most frequent recently)
   2. After losses, 65% switch to counter-gesture
   3. Last pattern suggests rotation behavior
   
   AI Decision: Play SCISSORS (counters predicted Paper)
   Confidence: 73%
   ```
   
   **Adaptive Difficulty:**
   - Automatically adjusts difficulty based on player skill
   - If player wins 70%+ → increase AI intelligence
   - If player wins <30% → reduce AI prediction weight
   - Maintains engaging 45-55% win rate for balanced gameplay
   
   **Explainable AI:**
   - Show why AI made its choice (optional debug mode)
   - Display detected patterns to educate player
   - "AI noticed you use Rock often after losing"
   - Help players improve their strategy

4. **Gameplay Enhancements**
   - Sound effects and haptic feedback
   - Gesture tutorials with animated guides
   - Practice mode with AI feedback on your patterns
   - Achievements and badges system
   - Best of 3/5/7 match modes
   - Tournament bracket mode
   - Daily challenges with specific AI opponents
   - "Mirror Mode" - AI copies your previous move (tutorial mode)

5. **Technical Improvements**
   - On-device ML model (TensorFlow Lite) for offline play
   - Faster gesture detection (<100ms latency)
   - Better lighting compensation with auto-adjust
   - Support for both hands simultaneously
   - Gesture strength/confidence indicator
   - Multiple hand styles (left/right handed)
   - Edge ML for privacy-preserving on-device prediction

6. **UI/UX Polish**
   - Interactive onboarding tutorial
   - Gesture strength indicator (live feedback)
   - Match history with statistics
   - Shareable results/screenshots with social media integration
   - Themes and customization (skins, backgrounds)
   - Animated characters for player/computer
   - Voice announcer option
   - Accessibility features (color blind mode, larger text)
   - AI "thinking" animation showing confidence levels

7. **Analytics & Insights**
   - Win rate statistics
   - Most used gesture tracking
   - Pattern visualization (heat maps of your tendencies)
   - Time-based performance graphs
   - Streak tracking (winning/losing)
   - Head-to-head records
   - **Predictability Score**: How random your play style is (0-100%)
   - **AI Adaptation Graph**: Shows how AI learned your patterns over time
   - **Weakness Report**: Which gestures you overuse and when
   - **Improvement Suggestions**: AI-generated tips to be less predictable

8. **Advanced AI Features**
   - **Strategy Presets**: Choose AI personality (Aggressive, Defensive, Balanced, Chaotic)
   - **Training Mode**: AI deliberately loses to help you practice
   - **Analysis Mode**: Post-game breakdown of what AI detected
   - **Psychological Warfare**: AI uses delays/timing to influence decisions
   - **Meta-Learning**: AI learns from aggregate data of all players globally
   - **Tournament AI**: Different AI opponents with unique strategies
   - **Co-op Mode**: Team up with AI against harder AI opponent

## 📄 API Documentation

### POST `/predict`
Processes image and returns game result.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `frame` (image file, JPEG format)

**Response:**
```json
{
  "player": "rock",
  "computer": "scissors",
  "result": "win",
  "scores": {
    "player": 5,
    "computer": 3,
    "draws": 2
  },
  "debug_image_b64": "base64_encoded_image_with_landmarks..."
}
```

**Error Response:**
```json
{
  "result": "No hand detected, try again!",
  "player": "none",
  "computer": "none",
  "scores": {
    "player": 5,
    "computer": 3,
    "draws": 2
  },
  "debug_image_b64": "base64_encoded_image..."
}
```

### POST `/reset`
Resets all scores to zero.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body: None required

**Response:**
```json
{
  "message": "Scores reset!",
  "scores": {
    "player": 0,
    "computer": 0,
    "draws": 0
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Ideas
- Improve gesture detection accuracy
- Add new game modes
- Implement multiplayer functionality
- Create iOS/Android native builds
- Add unit tests and integration tests
- Improve UI/UX with new animations
- Optimize performance and reduce latency
- Implement predictive AI algorithms
- Build pattern analysis dashboard

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Abhijeet Suryavanshi**
- GitHub: [abhiforgithonly](https://github.com/abhiforgithonly)
- LinkedIn: [Abhijeet Suryavanshi](www.linkedin.com/in/abhijee-suryavanshi)
- Email: abhijeets20032000@gmail.com

## 🙏 Acknowledgments

- **MediaPipe** by Google for amazing hand tracking technology
- **Expo** for seamless React Native development and QR code deployment
- **Flask** for lightweight and flexible backend framework
- **OpenCV** for powerful image processing capabilities
- **React Native Community** for excellent documentation and support

## 📞 Support

If you encounter any issues or have questions:
1. **Check version requirements** first (Python 3.9+, Node.js 18+)
2. Watch the [Video Walkthrough](https://www.loom.com/share/d8a4a77d696f47b1b51274e1189de837) for visual guidance
3. Open an issue on GitHub with:
   - Clear description of the problem
   - Steps to reproduce
   - Screenshots/logs if applicable
   - Device and OS information
   - **Python and Node.js versions** (`python --version`, `node --version`)
4. Contact: abhijeets20032000@gmail.com

## 🎯 Project Goal

This project was created as a take-home challenge to demonstrate:
- **Full-stack development** capabilities (React Native + Flask)
- **Real-time camera integration** with gesture detection
- **Product thinking** and user-centric design
- **Clean code** organization and documentation
- **Problem-solving** skills with ML integration
- **Mobile development** best practices

---

## 🚀 Quick Start Summary

**System Requirements:**
- ✅ Python 3.9+ (3.11+ recommended)
- ✅ Node.js 18 LTS+ (20 LTS recommended)
- ✅ npm 9+ (comes with Node.js)

**For Testers:**
1. Install Expo Go → Scan QR Code → Play! ✨

**For Developers:**
1. **Verify versions**: `python3 --version` and `node --version`
2. Clone repo
3. Start backend: `python app.py`
4. Update API endpoint in `api.js`
5. Start frontend: `npx expo start`
6. Scan QR code with Expo Go

**Requirements:**
- Latest Python (3.9+) and Node.js (18+) versions
- Same WiFi network for phone and computer
- Camera permissions enabled
- Good lighting for gesture detection

---

**Made with ❤️ and ✊✋✌️**

*Ready to play? Scan the QR code and show me your best gesture!* 🎮
