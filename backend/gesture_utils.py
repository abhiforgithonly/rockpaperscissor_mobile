import cv2
import mediapipe as mp
import numpy as np
import base64
from io import BytesIO
from PIL import Image

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.6,
    min_tracking_confidence=0.6
)

def detect_gesture(image_bytes):
    """
    Detect rock, paper, or scissors gesture from image bytes.
    Returns: (gesture_name, debug_image_base64)
    """
    try:
        # Convert bytes to image
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        img_np = np.array(image)
        img_rgb = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

        # Process with MediaPipe
        results = hands.process(cv2.cvtColor(img_rgb, cv2.COLOR_BGR2RGB))
        gesture = "none"
        confidence = 0

        if results.multi_hand_landmarks:
            # Draw landmarks on image with better colors
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    img_rgb, 
                    hand_landmarks, 
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=3, circle_radius=5),
                    mp_drawing.DrawingSpec(color=(0, 255, 255), thickness=3)
                )

            # Get landmarks
            landmarks = results.multi_hand_landmarks[0].landmark

            # Get key points
            thumb_tip = landmarks[4]
            thumb_ip = landmarks[3]
            thumb_mcp = landmarks[2]
            index_tip = landmarks[8]
            index_pip = landmarks[6]
            index_mcp = landmarks[5]
            middle_tip = landmarks[12]
            middle_pip = landmarks[10]
            middle_mcp = landmarks[9]
            ring_tip = landmarks[16]
            ring_pip = landmarks[14]
            ring_mcp = landmarks[13]
            pinky_tip = landmarks[20]
            pinky_pip = landmarks[18]
            pinky_mcp = landmarks[17]
            wrist = landmarks[0]
            palm_base = landmarks[0]

            # Calculate distances for better detection
            def get_distance(point1, point2):
                return ((point1.x - point2.x)**2 + (point1.y - point2.y)**2)**0.5

            # Improved finger extension detection
            def is_finger_extended(tip, pip, mcp):
                # Check if tip is above pip and the angle is reasonable
                tip_to_pip = get_distance(tip, pip)
                pip_to_mcp = get_distance(pip, mcp)
                
                # Finger is extended if tip is significantly higher than pip
                vertical_check = tip.y < pip.y - 0.04
                
                # Additional check: tip should be far from palm
                tip_to_palm = get_distance(tip, palm_base)
                pip_to_palm = get_distance(pip, palm_base)
                
                return vertical_check and tip_to_palm > pip_to_palm * 0.9

            # Thumb extension (horizontal movement)
            def is_thumb_extended(tip, ip, mcp, wrist):
                # Thumb extends outward from palm
                thumb_to_palm = get_distance(tip, palm_base)
                ip_to_palm = get_distance(ip, palm_base)
                
                horizontal_distance = abs(tip.x - wrist.x)
                return thumb_to_palm > ip_to_palm and horizontal_distance > 0.1

            # Check each finger
            thumb_extended = is_thumb_extended(thumb_tip, thumb_ip, thumb_mcp, wrist)
            index_extended = is_finger_extended(index_tip, index_pip, index_mcp)
            middle_extended = is_finger_extended(middle_tip, middle_pip, middle_mcp)
            ring_extended = is_finger_extended(ring_tip, ring_pip, ring_mcp)
            pinky_extended = is_finger_extended(pinky_tip, pinky_pip, pinky_mcp)

            # Count extended fingers (excluding thumb for main count)
            extended_fingers = [index_extended, middle_extended, ring_extended, pinky_extended]
            extended_count = sum(extended_fingers)

            # Calculate confidence based on how clear the gesture is
            total_fingers = extended_count + (1 if thumb_extended else 0)

            print(f"Finger status - Thumb: {thumb_extended}, Index: {index_extended}, "
                  f"Middle: {middle_extended}, Ring: {ring_extended}, Pinky: {pinky_extended}")
            print(f"Extended count (no thumb): {extended_count}, Total: {total_fingers}")

            # Improved gesture detection with confidence
            if extended_count == 0 and not thumb_extended:
                # All fingers closed = ROCK
                gesture = "rock"
                confidence = 95
                print("✊ Detected: ROCK (all fingers closed)")
                
            elif extended_count >= 4 and thumb_extended:
                # All fingers open = PAPER
                gesture = "paper"
                confidence = 95
                print("✋ Detected: PAPER (all fingers open)")
                
            elif extended_count == 2 and index_extended and middle_extended and not ring_extended and not pinky_extended:
                # Only index and middle extended = SCISSORS
                gesture = "scissors"
                confidence = 95
                print("✌️ Detected: SCISSORS (victory sign)")
                
            elif extended_count >= 3 and not thumb_extended:
                # 3-4 fingers but no thumb = likely PAPER
                gesture = "paper"
                confidence = 80
                print("✋ Detected: PAPER (mostly open)")
                
            elif extended_count == 1:
                # Only one finger = unclear, probably not a valid gesture
                gesture = "none"
                confidence = 0
                print(f"❓ Unclear: Only 1 finger extended")
                
            elif extended_count == 0 and thumb_extended:
                # Only thumb = likely ROCK (thumb sticking out a bit)
                gesture = "rock"
                confidence = 75
                print("✊ Detected: ROCK (thumb slightly out)")
                
            else:
                gesture = "none"
                confidence = 0
                print(f"❓ Unclear gesture - Extended: {extended_count}, Thumb: {thumb_extended}")

            # Draw gesture text with confidence on image
            gesture_text = f"{gesture.upper()}"
            if confidence > 0:
                gesture_text += f" ({confidence}%)"
            
            # Add colored background for better visibility
            text_size = cv2.getTextSize(gesture_text, cv2.FONT_HERSHEY_SIMPLEX, 1.2, 3)[0]
            cv2.rectangle(img_rgb, (5, 5), (text_size[0] + 20, 60), (0, 0, 0), -1)
            
            # Color based on gesture
            color = (0, 255, 0) if gesture != "none" else (0, 0, 255)
            cv2.putText(img_rgb, gesture_text, (10, 45),
                       cv2.FONT_HERSHEY_SIMPLEX, 1.2, color, 3)
            
            # Add finger count info
            finger_info = f"Fingers: {total_fingers}/5"
            cv2.putText(img_rgb, finger_info, (10, 85),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)

        else:
            print("❌ No hand detected in image")
            # Add warning text
            cv2.rectangle(img_rgb, (5, 5), (350, 60), (0, 0, 0), -1)
            cv2.putText(img_rgb, "NO HAND DETECTED", (10, 45),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # Encode debug image to base64 with good quality
        _, buffer = cv2.imencode('.jpg', img_rgb, [cv2.IMWRITE_JPEG_QUALITY, 90])
        img_b64 = base64.b64encode(buffer).decode('utf-8')

        return gesture, img_b64

    except Exception as e:
        print(f"❌ Error in detect_gesture: {str(e)}")
        import traceback
        traceback.print_exc()
        return "none", ""