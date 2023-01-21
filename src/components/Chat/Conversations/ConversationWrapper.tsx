import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import { ConversationList } from "./ConversationList";

interface Props {
  session: Session;
}

export const ConversationWrapper: React.FC<Props> = ({ session }: Props) => {
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border="1px solid red"
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      {/* skeletion loader  */}
      <ConversationList session={session} />
    </Box>
  );
};
