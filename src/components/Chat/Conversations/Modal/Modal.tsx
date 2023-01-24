import { SearchUsersData, SearchUsersInput } from "@/utils/types";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import UserOperations from "@/graphql/operations/user";

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
  const [username, setUsername] = useState("");
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  console.log("Here is search data", data);

  console.log("Here is search error", error);


  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={!username.length}
                  isLoading={loading}
                >
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
