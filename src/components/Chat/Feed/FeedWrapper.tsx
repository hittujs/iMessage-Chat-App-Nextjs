import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessagesHeader from "./Messages/Header";

interface Props {
  session: Session;
}

export const FeedWrapper: React.FC<Props> = ({ session }: Props) => {
  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
      border="1px solid red"
    >
      {conversationId ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
          border="1px solid green"
        >
          <MessagesHeader
            userId={userId}
            conversationId={conversationId as string}
          />
        </Flex>
      ) : (
        <div>No conversation selected</div>
      )}
    </Flex>
  );
};
