import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface Props {}

export const Chat: React.FC<Props> = (Props) => {
  return (
    <div>
      <Box>CHAT</Box>
      <Button variant={"ghost"} onClick={() => signOut()}>
        Log out
      </Button>
    </div>
  );
};
