"""
Simple in-memory game state manager with a persistent leaderboard (file-based).

Thread-safe operations using a simple lock.
"""

import json
import os
from threading import Lock

LEADERBOARD_FILE = os.environ.get("LEADERBOARD_FILE", "leaderboard.json")
LOCK = Lock()

# in-memory state for the current session
_game_state = {
    "player_score": 0,
    "ai_score": 0,
    "is_paused": False,
    "leaderboard": []
}

# Load persistent leaderboard if exists
def _load_leaderboard():
    if os.path.exists(LEADERBOARD_FILE):
        try:
            with open(LEADERBOARD_FILE, "r") as f:
                data = json.load(f)
                _game_state["leaderboard"] = data
        except Exception:
            _game_state["leaderboard"] = []

_load_leaderboard()

def start_game():
    with LOCK:
        _game_state["player_score"] = 0
        _game_state["ai_score"] = 0
        _game_state["is_paused"] = False
        return {"message": "new_game_started", "scores": get_scores()}

def pause_game():
    with LOCK:
        _game_state["is_paused"] = True
        return {"message": "game_paused"}

def resume_game():
    with LOCK:
        _game_state["is_paused"] = False
        return {"message": "game_resumed"}

def exit_game(player_name=None):
    with LOCK:
        # persist the current score to leaderboard (player_name optional)
        entry = {"player": player_name if player_name else "Player", "score": _game_state["player_score"]}
        _game_state["leaderboard"].append(entry)
        # keep top 10
        _game_state["leaderboard"] = sorted(_game_state["leaderboard"], key=lambda x: x["score"], reverse=True)[:10]
        final = {"message": "game_exited", "final_scores": get_scores(), "leaderboard": _game_state["leaderboard"]}
        return final

def get_scores():
    with LOCK:
        return {"player": _game_state["player_score"], "ai": _game_state["ai_score"]}

def update_scores(result):
    with LOCK:
        if result == "win":
            _game_state["player_score"] += 1
        elif result == "lose":
            _game_state["ai_score"] += 1
        # draw does not change scores
        return get_scores()

def get_leaderboard():
    with LOCK:
        return _game_state["leaderboard"]

def is_paused():
    with LOCK:
        return _game_state["is_paused"]

def save_leaderboard_persist():
    """
    Persist leaderboard to disk (thread-safe).
    """
    with LOCK:
        try:
            with open(LEADERBOARD_FILE, "w") as f:
                json.dump(_game_state["leaderboard"], f, indent=2)
            return True
        except Exception:
            return False
