import { Card, CardBody, CardFooter, Divider, HStack, Heading, Stack, ButtonGroup, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function RootPage() {
  const navigate = useNavigate();
  return (
    <HStack padding={8}>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Date Tool</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={() => navigate("/dateTool")}>
              Go
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </HStack>
  );
}
