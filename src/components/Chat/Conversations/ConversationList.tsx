import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { ConversationModal } from "./Modal/Modal";
import React, { useState } from "react";

interface Props {
  session: Session;
}

export const ConversationList: React.FC<Props> = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" bg="blackAlpha.800" fontWeight={500}>
          Find or start new conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
