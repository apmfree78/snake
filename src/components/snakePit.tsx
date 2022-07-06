// Cell specifies position on game board
interface Cell {
  x: number;
  y: number;
}

// Snake is just an array of cells
type SnakeBody = Cell[];

export default class SnakePit {
  // defining and initializing snake and food
  snake: SnakeBody = [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ];
  food: Cell = { x: 8, y: 8 };

  // defining speed of snake, for higher difficulty
  // will have higher speed
  snakeSpeed: number = 1;

  //direct snake is currently moving in snake pit
  // 4 possible values: up, down, left, or right
  direction: string = 'up';

  // x and y dimensions + GameGrid dimensions + scale
  xDim: number;
  yDim: number;
  xHeight: number;
  yWidth: number;
  scaleFactor: number;

  //setting game difficulty , it's either 'easy' , 'medium' or 'hard
  difficulty: string;

  constructor(Nx: number, Ny: number, difficulty: string = 'easy') {
    // setting random coordinates for snake
    const xHead = 3 + Math.floor(Math.random() * (Nx - 6));
    const yHead = 3 + Math.floor(Math.random() * (Nx - 6));

    this.snake = [
      { x: xHead, y: yHead },
      { x: xHead, y: yHead + 1 },
      { x: xHead, y: yHead + 2 },
    ];

    // setting board dimensions and scale
    this.xDim = Nx;
    this.yDim = Ny;
    this.scaleFactor = 0.8;

    //setting difficulty
    this.difficulty = difficulty;

    // setting GameGrid vmin dimensions
    if (Nx > Ny) {
      this.xHeight = Math.round(this.scaleFactor * 100);
      this.yWidth = Math.round((this.scaleFactor * (100 * Ny)) / Nx);
    } else {
      this.xHeight = Math.round((this.scaleFactor * 100 * Nx) / Ny);
      this.yWidth = Math.round(this.scaleFactor * 100);
    }

    //checking if there is higher difficulting setting
    if (difficulty === 'medium') this.snakeSpeed = 1.5;
    else if (difficulty === 'hard') this.snakeSpeed = 2.0;
  } // end of constructor

  // arrow function to return position of snake head
  snakeHead = () => this.snake[0];
}
