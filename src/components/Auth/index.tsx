import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export const Auth: React.FC<Props> = (session, reloadSession) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      // create username mutation to send out username to the GraphQL API
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Center height="100vh" border="1px solid red">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>

            <Button width="100%">Save</Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQL</Text>
            <Button
              width="100%"
              leftIcon={<Image height="20px" src="/images/google.png" />}
              variant={"ghost"}
              onClick={() => signIn("google")}
            >
              Continue with google{" "}
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
