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
  snakeSpeed: number = 1.5;

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
    const xHead = 3 + Math.floor(Math.random() * (Ny - 6));
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
    if (difficulty === 'medium') this.snakeSpeed = 2;
    else if (difficulty === 'hard') this.snakeSpeed = 3;
  } // end of constructor

  // arrow function to return position of snake head
  snakeHead = () => this.snake[0];

  // after snake moves on the screen each of its cells' positions
  // need to be updated.  We do this by adding the new position
  // as new head of snake and remove final position of snake
  newSnakeBody(newHead: Cell) {
    // add new head to snake
    this.snake.unshift(newHead);

    //remove old tail
    this.snake.pop();
  }

  // after snake eats food it's body grows by 1 unit
  // we grow the snake by adding a cell at the end
  // in the OPPOSITE direction that it's moving
  growSnakeBody() {
    // first get tail of snake (last cell)
    const newTail: Cell = this.snake[this.snake.length - 1];

    // now based on direction snake is moving seemlessly add on tail
    switch (this.direction) {
      case 'up':
        newTail.y++;
        break;
      case 'down':
        newTail.y--;
        break;
      case 'left':
        newTail.x++;
        break;
      case 'right':
        newTail.x--;
        break;
    }

    // add tail onto Snake
    this.snake.push(newTail);
  }

  // checking if snake is colliding with either
  // itself a possible barrior or new food position
  // is colliding into snake body, if so , game over!
  snakeCollision(item: Cell): boolean {
    let collision = false;
    // looping through snake body to see if there is self collision
    for (const { x, y } of this.snake) {
      if (x === item.x && y === item.y) {
        collision = true;
        break;
      }
    }
    return collision;
  }

  // place food in random position
  placeFood(): Cell {
    const x = 1 + Math.floor(Math.random() * (this.yDim - 2));
    const y = 1 + Math.floor(Math.random() * (this.xDim - 2));
    this.food = { x, y };
    return this.food;
  }
}
