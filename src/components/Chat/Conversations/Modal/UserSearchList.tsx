import { SearchResult } from "@/utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface Props {
  users: Array<SearchResult>;
  addParticipant: (user: SearchResult) => void;
}

export const UserSearchList = ({ users, addParticipant }: Props) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user, index) => (
            <Stack
              key={index + 1}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar src="" />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand:100" }}
                  onClick={() => {
                    addParticipant(user);
                  }}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};
