import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { MdArrowForward } from "react-icons/md";

export default function Index() {
  return (
    <Flex h="100%" justifyContent="center" alignItems="center" direction="column">
      <Heading size="4xl" mb="4">Room Sketch</Heading>
      <Button as={Link} variant="outline" to="/canvas">Go<MdArrowForward /></Button>
    </Flex>
  );
}
