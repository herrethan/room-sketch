import React from 'react';
import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const RoomContainer = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return <Box ref={ref} height="100vh" {...props} />;
  }
);

export default RoomContainer;
