import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import MessageOperations from "@/graphql/operations/message";
import {
  MessagesData,
  MessagesVariables,
  MessageSubscriptionData,
} from "@/utils/types";
import { toast } from "react-hot-toast";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import { useEffect } from "react";
import { MessageItem } from "./MessageItem";

interface Props {
  userId: string;
  conversationId: string;
}

export const Messages: React.FC<Props> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Query.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) {
          return prev;
        }

        console.log("Here is the subscription data", subscriptionData);

        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages],
        });
      },
    });
  };
  useEffect(() => {
    subscribeToMoreMessages(conversationId);
  }, [conversationId]);

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height="60px" width="100%" />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflow="scroll" height="100%">
          {data.messages.map((message: any) => (
            <MessageItem key={message.id} message={message} sentByMe={false} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
