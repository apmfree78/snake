import React, { useEffect, useState } from 'react';
import SnakePit from './snakePit';
import Swal from 'sweetalert2';
import GameCell from './GameCell';
import { playSound } from '../library/sounds';
import { GameInputForm } from './GameInputForm';
import { ScoreBoard, GameGrid } from '../library/gameStyled';

//initial default values size of board , Nx x Ny
const Nx: number = 15;
const Ny: number = 20;
const difficulty: string = 'easy'; // diffculting of game, determines % of mines

// Cell specifies position on game board
interface Cell {
  x: number;
  y: number;
}

// the game object creates the static game
let game: SnakePit = new SnakePit(Nx, Ny, difficulty);

// its contains the following functions
/* 
  // define methods
  // return of location x, y has a bomb
  hasMine(x: number, y: number): boolean
 
  // return initial state of game, NxN boolean matrix
  // if cell is hidden => false, if cell is visible => true
  // because this is initial state all cells are FALSE (hidden)
  getInitialState(): boolean[][]

  // number of adjacent cells that contain mines
  adjacentMines(x: number, y: number): number 

  // total number of mines on the board
  totalMineCount() 

 // recursive function to reveal each neighor that does not contain
  // a bomb. Neighbors are ALL surround cells
  revealNeighbors(i: number, j: number, state: Game, boardState: Board): void 

 */

const App: React.FC = () => {
  // cellState[x][y] contains the data on the state of cell at x,y
  // as defined in Cell interface :
  /*  interface Cell {
    isFlagged: boolean; //true => cell is flagged, false => not flagged
    isRevealed: boolean; //true => cell is revealed, false => hidden
    hasMine: boolean; // true => has a mine, false => no mine
    adjacentMines: number; // number of neighors that have a mine
  } */
  const [snakePosition, setSnakePosition] = useState<Cell>(game.snakeHead());
  const [foodPosition, setFoodPosition] = useState<Cell>(game.food);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // moveSnake function will be a call back function for setInterval
  // it will move the snake to next position , based on snake direction
  function moveSnake(direction: string): void {
    //determine next position of snake head
    const NewPosition: Cell = { ...snakePosition };
    console.log(NewPosition);
    // console.log(gameOver);
    // first extract current position of snake head

    switch (direction) {
      case 'up':
        NewPosition.y--;
        break;
      case 'down':
        NewPosition.y++;
        break;
      case 'left':
        NewPosition.x--;
        break;
      case 'right':
        NewPosition.x++;
        break;
    }

    // checking if new snake head is in bounds, if not game over!
    if (
      NewPosition.y === game.xDim ||
      NewPosition.x === game.yDim ||
      NewPosition.y < 0 ||
      NewPosition.x < 0
    ) {
      setGameOver(true);
    }
    //check if snake hit into itself, if so game over!
    else if (game.snakeCollision(NewPosition)) {
      console.log('self collision');
      setGameOver(true);
    }

    //LATER : check if snake had hit food
    if (JSON.stringify(NewPosition) === JSON.stringify(game.food)) {
      // grow snake 1 unit longer
      game.growSnakeBody();

      // place food in new position
      setFoodPosition(game.placeFood());

      // reward player with +5 on their score
      setGameScore(gameScore + 5);
    }

    //update position of snake body based on new position
    game.newSnakeBody(NewPosition);

    //update state
    setSnakePosition(NewPosition);
  }

  // reset the board with default or user provided
  // custom dimensions and difficulty
  function resetGame(
    xdim: number = game.xDim,
    ydim: number = game.yDim,
    level: string = game.difficulty
  ): void {
    //generate new game
    game = new SnakePit(xdim, ydim, level);
    setGameOver(false);
    setGameScore(0);
    // play start sound
    playSound('start');

    // reset game state with all cells hidden
    setSnakePosition(game.snakeHead());
    setFoodPosition(game.food);
  }

  // adding Event listoner to capture when player
  // hits up , down, right, or left arrow
  // update game.direction once this happens
  useEffect(() => {
    const playerInput = (event: KeyboardEvent): void => {
      //determine what direction user wants snake to go
      console.log(event.key);
      switch (event.key) {
        case 'ArrowUp':
          game.direction = 'up';
          break;
        case 'ArrowDown':
          game.direction = 'down';
          break;
        case 'ArrowRight':
          game.direction = 'right';
          break;
        case 'ArrowLeft':
          game.direction = 'left';
          break;
      }
    };

    window.addEventListener('keydown', playerInput);

    if (gameOver) window.removeEventListener('keydown', playerInput);

    //on unmount clear interval
    return () => window.removeEventListener('keydown', playerInput);
  });

  // continuously loop game, until gameOver is True
  useEffect(() => {
    const movementDelay: number = Math.round(1000 / game.snakeSpeed);

    const gameInterval: NodeJS.Timer = setInterval(
      () => moveSnake(game.direction),
      movementDelay
    );

    if (gameOver) clearInterval(gameInterval);

    //on unmount clear interval
    return () => clearInterval(gameInterval);
  });

  //deconstruct game state
  const { xHeight, yWidth, xDim, yDim } = game;

  return (
    <>
      <ScoreBoard width={yWidth}>
        {!gameOver ? (
          <>
            <span style={{ paddingTop: 4 }}>SCORE: {gameScore}</span>
            <span style={{ paddingTop: 4 }}>
              SNAKE SIZE: {game.snake.length}
            </span>
          </>
        ) : (
          <>
            <span style={{ paddingTop: 4 }}>
              GAME OVER! PLEASE PLAY AGAIN {`==>`}{' '}
            </span>
          </>
        )}
        <button
          type='submit'
          style={{ borderWidth: 5, borderColor: '#CCC' }}
          onClick={() => resetGame()}>
          Restart Game
        </button>
      </ScoreBoard>
      <GameGrid height={xHeight} width={yWidth} xdim={xDim} ydim={yDim}>
        <>
          {game.snake.map(({ x, y }, index) => {
            return (
              <GameCell key={Math.random()} x={x} y={y} cellType='snake' />
            );
          })}
          <GameCell x={game.food.x} y={game.food.y} cellType='food' />
        </>
      </GameGrid>
      <GameInputForm width={yWidth} resetGame={resetGame} />
    </>
  );
};

export default App;
