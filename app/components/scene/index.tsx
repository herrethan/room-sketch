import React from 'react';
import type { SystemStyleObject } from '@chakra-ui/react';
import { Flex, Box, Text } from '@chakra-ui/react';
import theme from '~/theme';
import { useScenePan } from './pan-provider';
import { useDragToScroll } from '~/hooks/use-drag-to-scroll';
import { SceneRefProvider } from './provider';

export const SCENE_SIZE = 100;

const originMargin = SCENE_SIZE % 2 === 0 ? `-1em 0 0 -1em` : 0;

const gridStyles: SystemStyleObject = {
  position: 'absolute',
  height: `${SCENE_SIZE}em`,
  width: `${SCENE_SIZE}em`,
  alignItems: 'center',
  justifyContent: 'center',
  transformStyle: 'preserve-3d',
  transition: `transform ${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`,
  backgroundImage: `linear-gradient(${theme.colors.gray[200]} 1px, transparent 1px),
    linear-gradient(90deg, ${theme.colors.gray[200]} 1px, transparent 1px)`,
  backgroundSize: `1em 1em, 1em 1em`,
  backgroundPosition: `-1px -1px, -1px -1px`,
  '& .preserved': {
    transformStyle: 'preserve-3d',
  },
};

export interface SceneProps {
  zoom?: number;
  showOrigin?: boolean;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  children?: React.ReactNode;
}

const dotStyles = {
  position: 'absolute',
  width: '0.5rem',
  height: '0.5rem',
  top: '-0.25rem',
  left: '-0.25rem',
  borderRadius: '50%',
  backgroundColor: 'gray.500',
  scrollSnapAlign: 'right',
};

const OriginDot = () => {
  return (
    <Box sx={dotStyles}>
      <Text
        fontSize="small"
        color="gray.500"
        position="absolute"
        top="100%"
        left="0"
        whiteSpace="nowrap"
      >
        (0, 0)
      </Text>
    </Box>
  );
};

const Scene = ({
  zoom = 1,
  showOrigin,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  children,
}: SceneProps) => {
  const [panMode] = useScenePan();
  const containerRef = React.useRef(null);
  const { isDragging } = useDragToScroll(
    containerRef.current && panMode === 'on' ? containerRef : null
  );
  const cursor = panMode === 'on' ? (isDragging ? 'grabbing' : 'grab') : 'auto';
  const userSelect = isDragging ? 'none' : 'auto';
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

  const centered = React.useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        node.scrollIntoView({ block: 'center', inline: 'center' });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zoom]
  );

  return (
    <Flex
      ref={containerRef}
      fontSize={`${zoom}em`}
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <SceneRefProvider sceneRef={containerRef}>
        <Flex
          backgroundColor="paper"
          sx={{ ...gridStyles, transform, cursor, userSelect }}
        >
          <Box
            ref={centered}
            className="preserved"
            position="relative"
            w="0"
            h="0"
            m={originMargin}
          >
            {showOrigin && <OriginDot />}
            {children}
          </Box>
        </Flex>
      </SceneRefProvider>
    </Flex>
  );
};

export default Scene;
