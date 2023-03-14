import React from 'react';
import type { Wall as WallType } from '~/data/walls';
import { areAllWallsSquare, prettifyButts } from './utils';
import Wall from '../wall';

export interface WallsProps {
  walls: WallType[];
}

const Walls = ({ walls }: WallsProps) => {
  let theWalls: WallType[] = walls;

  if (walls.length > 1 && !areAllWallsSquare(walls)) {
    theWalls = prettifyButts(walls);
  }

  return (
    <>
      {theWalls.map(wall => (
        <Wall key={JSON.stringify(wall.position)} position={wall.position} />
      ))}
    </>
  );
};

export default Walls;
