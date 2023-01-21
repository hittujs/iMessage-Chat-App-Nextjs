import { Box, Button, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { ConversationWrapper } from "./Conversations/ConversationWrapper";
import { FeedWrapper } from "./Feed/FeedWrapper";

interface Props {
  session: Session;
}

export const Chat: React.FC<Props> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
      {/* <Button variant={"ghost"} onClick={() => signOut()}>
        Log out
      </Button> */}
    </Flex>
  );
};
