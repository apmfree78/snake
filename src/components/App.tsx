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
// Snake is just an array of cells
type SnakeBody = Cell[];

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
    // play start sound
    playSound('start');

    // reset game state with all cells hidden
    setSnakePosition(game.snakeHead());
    setFoodPosition(game.food);
  }

  // play sound at start of game
  useEffect(() => {
    playSound('start');
  }, []);

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
            return <GameCell x={x} y={y} cellType='snake' />;
          })}
          <GameCell x={game.food.x} y={game.food.y} cellType='food' />
        </>
      </GameGrid>
      <GameInputForm width={yWidth} resetGame={resetGame} />
    </>
  );
};

export default App;
