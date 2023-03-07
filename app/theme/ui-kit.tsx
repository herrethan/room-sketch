import React from 'react';
import {
  Button,
  Flex,
  GridItem,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Switch,
  Box,
  Checkbox,
  RadioGroup,
  Stack,
  Text,
  Radio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';

const UIKit = () => {
  return (
    <SimpleGrid m="8" columns={3} gap="8">
      <Flex direction="column" gap="4">
        <Button variant="solid">Solid button</Button>
        <Button variant="outline" ml="0">
          Outline button
        </Button>
        <Button variant="ghost">Ghost button</Button>
        <Button variant="link">Link button</Button>
        <Button variant="unstyled">Unstyled button</Button>
      </Flex>
      <Flex direction="column" gap="4">
        <Heading size="lg">Heading lg</Heading>
        <Heading size="md">Heading md</Heading>
        <Heading size="sm">Heading sm</Heading>
        <Heading size="xs" textTransform="uppercase">
          Upper case text
        </Heading>
      </Flex>
      <Flex direction="column" gap="4">
        <Box>
          <Checkbox defaultChecked>Checkbox</Checkbox>
        </Box>
        <Box>
          <RadioGroup defaultValue="2">
            <Stack direction="row">
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="slider-1" flexShrink="0" mb="0">
            Slide me
          </FormLabel>
          <Slider id="slider-1" aria-label="slider-1" defaultValue={10} min={0} max={20}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize="4" />
          </Slider>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Enable email alerts?
          </FormLabel>
          <Switch id="email-alerts" />
        </FormControl>
      </Flex>
      <GridItem>
        <Popover>
          <PopoverTrigger>
            <Button colorScheme="gray">Trigger a milkshake</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
            <PopoverBody>
              <Text>Are you sure you want to have that milkshake?</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </GridItem>
      <GridItem></GridItem>
      <GridItem></GridItem>
      <GridItem></GridItem>
    </SimpleGrid>
  );
};

export default UIKit;
