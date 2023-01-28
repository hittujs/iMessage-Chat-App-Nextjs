import { useMutation } from "@apollo/client";
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
import userOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export const Auth: React.FC<Props> = (session, reloadSession) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }
      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }
      // Reload session to obtain new username
      reloadSession();
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(session, "session from auth");

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

            <Button width="100%" onClick={onSubmit} isLoading={loading}>
              Save
            </Button>
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
              Continue with google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
