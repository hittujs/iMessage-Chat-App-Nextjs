import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import { ConversationList } from "./ConversationList";
import ConversationOpearations from "@/graphql/operations/conversation";
import { conversationsData } from "@/utils/types";

interface Props {
  session: Session;
}

export const ConversationWrapper: React.FC<Props> = ({ session }: Props) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
  } = useQuery<conversationsData, null>(
    ConversationOpearations.Queries.conversations
  );

  console.log("Here is the data", conversationsData);

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border="1px solid red"
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      {/* skeletion loader  */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};
