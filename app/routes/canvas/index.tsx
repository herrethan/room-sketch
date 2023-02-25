import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/layout';
import theme from '~/theme';

console.log(theme.borders);
export default function Canvas() {
  return (
    <div>
      <Heading>I'm Dink</Heading>
      <Text>I'm some text</Text>
      <Button>And I'm a pickin</Button>
    </div>
  );
}
