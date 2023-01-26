import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  session: Session;
}

export const FeedWrapper: React.FC<Props> = ({ session }: Props) => {
  const router = useRouter();
  const { conversationId } = router.query;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
      border="1px solid red"
    >
      {conversationId ? (
        <Flex>{conversationId}</Flex>
      ) : (
        <div>No conversation selected</div>
      )}
    </Flex>
  );
};
