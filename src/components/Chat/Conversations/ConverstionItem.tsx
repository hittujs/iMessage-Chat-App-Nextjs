import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

interface Props {
  conversation: ConversationPopulated;
}

export const ConversationItem: React.FC<Props> = ({ conversation }: Props) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};
