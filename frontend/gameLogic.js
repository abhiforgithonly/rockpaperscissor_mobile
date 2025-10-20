/**
 * Game logic utilities for Rock Paper Scissors
 */

export const MOVES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
  NONE: 'none',
};

export const RESULTS = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

/**
 * Determines the winner of a Rock Paper Scissors round
 * @param {string} playerMove - The player's move
 * @param {string} computerMove - The computer's move
 * @returns {string} - 'win', 'lose', or 'draw'
 */
export const determineWinner = (playerMove, computerMove) => {
  if (playerMove === computerMove) {
    return RESULTS.DRAW;
  }

  const winConditions = {
    [MOVES.ROCK]: MOVES.SCISSORS,
    [MOVES.PAPER]: MOVES.ROCK,
    [MOVES.SCISSORS]: MOVES.PAPER,
  };

  if (winConditions[playerMove] === computerMove) {
    return RESULTS.WIN;
  }

  return RESULTS.LOSE;
};

/**
 * Gets a random computer move
 * @returns {string} - 'rock', 'paper', or 'scissors'
 */
export const getComputerMove = () => {
  const moves = [MOVES.ROCK, MOVES.PAPER, MOVES.SCISSORS];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};

/**
 * Updates scores based on the result
 * @param {object} currentScores - Current score object
 * @param {string} result - 'win', 'lose', or 'draw'
 * @returns {object} - Updated scores
 */
export const updateScores = (currentScores, result) => {
  const newScores = { ...currentScores };

  if (result === RESULTS.WIN) {
    newScores.player += 1;
  } else if (result === RESULTS.LOSE) {
    newScores.computer += 1;
  } else if (result === RESULTS.DRAW) {
    newScores.draws += 1;
  }

  return newScores;
};

/**
 * Gets emoji representation of a move
 * @param {string} move - The move
 * @returns {string} - Emoji representation
 */
export const getMoveEmoji = (move) => {
  const emojis = {
    [MOVES.ROCK]: '✊',
    [MOVES.PAPER]: '✋',
    [MOVES.SCISSORS]: '✌️',
    [MOVES.NONE]: '❓',
  };
  return emojis[move] || '❓';
};

/**
 * Gets the result message
 * @param {string} result - The result
 * @returns {string} - Result message
 */
export const getResultMessage = (result) => {
  const messages = {
    [RESULTS.WIN]: '🎉 You Win! 🎉',
    [RESULTS.LOSE]: '😢 You Lose!',
    [RESULTS.DRAW]: '🤝 It\'s a Draw!',
  };
  return messages[result] || 'Make Your Move!';
};