import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ObjectId } from "bson";
import messageOperations from "@/graphql/operations/message";
import { SendMessageArgs } from "../../../../../../backend/src/util/types";

interface Props {
  session: Session;
  conversationId: string;
}

export const MessageInput = ({
  session,
  conversationId,
}: Props): JSX.Element => {
  const [sendMessage] = useMutation<{ sendMessage: boolean }, SendMessageArgs>(
    messageOperations.Mutation.sendMessage
  );
  const [messageBody, setMessageBody] = useState("");

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { id: senderId } = session?.user;
      const newId = new ObjectId().toString();
      const newMessage: SendMessageArgs = {
        id: newId,
        senderId,
        body: messageBody,
        conversationId,
      };
      const { data, errors } = await sendMessage({
        variables: newMessage,
      });
      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send the message");
      }
    } catch (error: any) {
      console.log(error, "error sending message");
      toast.error(error?.message);
    }
  };
  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          size="md"
          resize="none"
          placeholder="New Message"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
        ></Input>
      </form>
    </Box>
  );
};
