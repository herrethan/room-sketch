import React from 'react';
import type { SystemStyleObject } from '@chakra-ui/react';
import { Flex, Box, Text } from '@chakra-ui/react';
import theme from '~/theme';

const SCENE_SIZE = 81;

const gridStyles: SystemStyleObject = {
  position: 'absolute',
  height: `${SCENE_SIZE}em`,
  width: `${SCENE_SIZE}em`,
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
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
      <Text fontSize="small" color="gray.500" position="absolute" top="100%" left="0" whiteSpace="nowrap">
        (0, 0)
      </Text>
    </Box>
  );
};

const originMargin = SCENE_SIZE % 2 === 0 ? `-1em 0 0 -1em` : 0;

const Scene = ({ zoom = 1, showOrigin, rotateX = 0, rotateY = 0, rotateZ = 0, children }: SceneProps) => {
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

  const centered = React.useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ block: 'center', inline: 'center' });
    }
  }, []);

  return (
    <Flex fontSize={`${zoom}em`}>
      <Flex backgroundColor="paper" sx={{ ...gridStyles, transform }}>
        <Box ref={centered} className="preserved" w="0" h="0" position="relative" m={originMargin}>
          {showOrigin && <OriginDot />}
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Scene;
