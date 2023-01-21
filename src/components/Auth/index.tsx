import { Box, Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";

interface Props {}

export const Auth: React.FC<Props> = (Props) => {
  return (
    <div>
      <Box>Auth</Box>
      <Button variant={"ghost"} onClick={() => signIn("google")}>
        Log In
      </Button>
    </div>
  );
};
