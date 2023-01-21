import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<Props> = ({
  session,
  isOpen,
  onClose,
}: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Text Modal</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
