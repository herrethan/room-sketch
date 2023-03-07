import React from 'react';
import type { SystemStyleObject } from '@chakra-ui/react';
import { Flex, Box, Text } from '@chakra-ui/react';
import theme from '~/theme';

const SCENE_EM = 33;

const gridStyles: SystemStyleObject = {
  position: 'absolute',
  height: `${SCENE_EM}em`,
  width: `${SCENE_EM}em`,
  top: '50%',
  left: '50%',
  margin: `-${SCENE_EM / 2}em 0 0 -${SCENE_EM / 2}em`,
  transformStyle: 'preserve-3d',
  transition: `transform ${theme.transition.duration.fast} ${theme.transition.easing['ease-in-out']}`,
  backgroundImage: `linear-gradient(${theme.colors.gray[200]} 1px, transparent 1px),
    linear-gradient(90deg, ${theme.colors.gray[200]} 1px, transparent 1px)`,
  backgroundSize: `1em 1em, 1em 1em`,
  backgroundPosition: `-1px -1px, -1px -1px`,
};

interface SceneProps {
  zoom?: number;
  showOrigin?: boolean;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  children?: React.ReactNode;
}

const OriginDot = () => {
  return (
    <Box w=".5rem" h=".5rem" position="relative" borderRadius="50%" bgColor="gray.500">
      <Text fontSize="small" color="gray.500" position="absolute" top="100%" left="0" whiteSpace="nowrap">
        (0, 0)
      </Text>
    </Box>
  );
};

const originMargin = SCENE_EM % 2 === 0 ? `-0.5em 0 0 -1em` : 0;

const Scene = ({ zoom = 1, showOrigin, rotateX = 0, rotateY = 0, rotateZ = 0, children }: SceneProps) => {
  const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

  return (
    <Box fontSize={`${zoom}em`}>
      <Flex backgroundColor="paper" sx={{ ...gridStyles, transform }}>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Flex alignItems="center" justifyContent="center" height="100%" m={originMargin}>
            {showOrigin && <OriginDot />}
            <Box w="0" h="0" position="relative">
              {children}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Scene;
