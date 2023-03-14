import React from 'react';
import { Box, useOutsideClick } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import type { Wall } from '~/data/walls';
import { wallEditStyles } from './styles';
import WallMutate from './wall-mutate';
import { allSharedCornersAreSquare } from './utils';

export interface WallsProps {
  walls: Wall[];
  onCommit: (walls: Wall[]) => void;
}

interface WallEditState {
  walls: Wall[];
  selectedWall: number | null;
  // history?: // TODO: for managing undos
}

const WallsEditor = ({ walls, onCommit }: WallsProps) => {
  const [state, dispatch] = React.useReducer(
    (state: WallEditState, action: Partial<WallEditState>) => {
      return { ...state, ...action };
    },
    { walls, selectedWall: null }
  );

  const svgRef = React.useRef<SVGSVGElement | null>(null);

  useOutsideClick({
    ref: svgRef as React.RefObject<HTMLElement>,
    handler: () => {
      onCommit(state.walls);
      dispatch({ selectedWall: null });
    },
  });

  const selectedPosition =
    state.selectedWall !== null && state.walls[state.selectedWall]?.position;

  const onLineSelect = (pos: Wall['position']) => {
    const i = state.walls.findIndex(w => isEqual(w.position, pos));
    dispatch({ selectedWall: typeof i === 'number' ? i : null });
  };

  const onWallChange = (
    newPosition: Wall['position'],
    isConstrained?: boolean
  ) => {
    const newWalls = [...state.walls];
    if (selectedPosition && typeof state.selectedWall === 'number') {
      // if this is a constrained line shift (rather than vertex shift)
      if (isConstrained) {
        // if changed wall has neighboring square vertices, drag those walls along with it
        newWalls.forEach(({ position }, index) => {
          if (!isEqual(position, selectedPosition)) {
            position.forEach((pos, i) => {
              // for every matched coordinate, carefully merge in new coordinates
              if (isEqual(pos, selectedPosition[0])) {
                // NOTE: must use spread operator here so react knows to update (can't use mere =)
                newWalls[index] = {
                  ...newWalls[index],
                  position: [
                    newPosition[0],
                    newWalls[index].position[Math.abs(i - 1)],
                  ],
                };
              } else if (isEqual(pos, selectedPosition[1])) {
                newWalls[index] = {
                  ...newWalls[index],
                  position: [
                    newWalls[index].position[Math.abs(i - 1)],
                    newPosition[1],
                  ],
                };
              }
            });
          }
        });
      }
      newWalls[state.selectedWall] = {
        ...newWalls[state.selectedWall],
        position: newPosition,
      };
      dispatch({ walls: newWalls });
    }
  };

  return (
    <Box sx={wallEditStyles}>
      <svg ref={svgRef}>
        {state.walls.map(({ position }) => (
          <g key={JSON.stringify(position)}>
            <line
              className="hit-area"
              onClick={() => onLineSelect(position)}
              x1={`${position[0][0]}em`}
              y1={`${position[0][1] * -1}em`}
              x2={`${position[1][0]}em`}
              y2={`${position[1][1] * -1}em`}
            />
            <line
              x1={`${position[0][0]}em`}
              y1={`${position[0][1] * -1}em`}
              x2={`${position[1][0]}em`}
              y2={`${position[1][1] * -1}em`}
            />
          </g>
        ))}
        {selectedPosition && (
          <WallMutate
            position={selectedPosition}
            hasSquareEdges={allSharedCornersAreSquare(
              selectedPosition,
              state.walls
            )}
            onChange={onWallChange}
          />
        )}
      </svg>
    </Box>
  );
};

export default WallsEditor;
