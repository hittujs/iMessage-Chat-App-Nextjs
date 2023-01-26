import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { ConversationList } from "./ConversationList";
import ConversationOpearations from "@/graphql/operations/conversation";
import { conversationsData } from "@/utils/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { useRouter } from "next/router";

interface Props {
  session: Session;
}

export const ConversationWrapper: React.FC<Props> = ({ session }: Props) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<conversationsData, null>(
    ConversationOpearations.Queries.conversations
  );

  const router = useRouter();
  const conversationId = router.query;

  const onViewConversation = async (conversationId: string) => {
    // 1. Push the new conversation id to the router query param

    router.push({ query: { conversationId } });
    // mark the conversation as read
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOpearations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversationsData: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
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
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};
