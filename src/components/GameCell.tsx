import styled from 'styled-components';

// Cell specifies position on game board
interface Cell {
  x: number;
  y: number;
}

interface Props {
  cell: Cell;
  cellType: string;
}

interface StyleProps {
  x: number;
  y: number;
}

// css for game cell box (hidden)
const SnakeBody = styled.div<StyleProps>`
  grid-column-start: ${(p) => p.x};
  grid-row-start: ${(p) => p.y};
  background-color: blue;
  border-radius: 1vmin;
  border: 0.4vmin solid black;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 2vmin;
  font-weight: bolder; */
`;

const FoodBody = styled(SnakeBody)`
  grid-column-start: ${(p) => p.x};
  grid-row-start: ${(p) => p.y};
  background-color: yellow;
  border-radius: 0.3vmin;
`;

//SnakeCell button - reusable component
const SnakeCell: React.FC<Props> = ({ cell, cellType }) => {
  if (cellType === 'snake') return <SnakeBody x={cell.x} y={cell.y} />;
  else return <FoodBody x={cell.x} y={cell.y} />;
};

export default SnakeCell;
