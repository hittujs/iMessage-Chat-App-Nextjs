import { SearchResult, SearchUsersData, SearchUsersInput } from "@/utils/types";
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
  Toast,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import UserOperations from "@/graphql/operations/user";
import { UserSearchList } from "./UserSearchList";
import { Participants } from "./Participants";

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
  const [participant, setParticipant] = useState<Array<SearchResult>>([]);

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

  const addParticipant = (user: SearchResult) => {
    setParticipant((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipant((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversations = async () => {
    try {
      //create conversation mutation
    } catch (error: any) {
      console.log("on create error", error);
      // toast.error(error?.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a conversation</ModalHeader>
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
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participant.length !== 0 && (
              <>
                <Participants
                  participants={participant}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  onClick={() => {
                    onCreateConversations();
                  }}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
