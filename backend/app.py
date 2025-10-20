from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from gesture_utils import detect_gesture

app = Flask(__name__)
CORS(app)

SCORES = {"player": 0, "computer": 0, "draws": 0}

TEST_MODE = False  # Set to True to make computer copy player's move for testing

@app.route("/predict", methods=["POST"])
def predict():
    if 'frame' not in request.files:
        return jsonify({"error": "No frame received"}), 400

    frame = request.files['frame'].read()
    print(f"Received frame size: {len(frame)} bytes")
    
    player_move, debug_b64 = detect_gesture(frame)
    print(f"Detected gesture: {player_move}")

    if player_move == "none":
        return jsonify({
            "result": "No hand detected, try again!", 
            "player": "none", 
            "computer": "none",
            "scores": SCORES,
            "debug_image_b64": debug_b64
        })

    # Choose computer move based on TEST_MODE
    if TEST_MODE:
        computer_move = player_move
        print(f"🧪 TEST MODE: Computer chose: {computer_move} (same as player)")
    else:
        computer_move = random.choice(["rock", "paper", "scissors"])
        print(f"Computer chose: {computer_move}")

    # Determine winner
    if player_move == computer_move:
        result = "draw"
        SCORES["draws"] += 1
    elif (player_move == "rock" and computer_move == "scissors") or \
         (player_move == "paper" and computer_move == "rock") or \
         (player_move == "scissors" and computer_move == "paper"):
        result = "win"
        SCORES["player"] += 1
    else:
        result = "lose"
        SCORES["computer"] += 1

    print(f"Result: {result}, Scores: {SCORES}")

    return jsonify({
        "player": player_move,
        "computer": computer_move,
        "result": result,
        "scores": SCORES,
        "debug_image_b64": debug_b64
    })


@app.route("/reset", methods=["POST"])
def reset_scores():
    global SCORES
    SCORES = {"player": 0, "computer": 0, "draws": 0}
    print("Scores reset!")
    return jsonify({"message": "Scores reset!", "scores": SCORES})


if __name__ == "__main__":
    print("Starting Flask server on http://0.0.0.0:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
