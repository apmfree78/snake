import styled from 'styled-components';

interface Props {
  x: number;
  y: number;
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
const SnakeCell: React.FC<Props> = ({ x, y, cellType }) => {
  if (cellType === 'snake') return <SnakeBody x={x} y={y} />;
  else return <FoodBody x={x} y={y} />;
};

export default SnakeCell;
