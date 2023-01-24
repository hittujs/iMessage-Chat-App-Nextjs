import { SearchResult } from "@/utils/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  participants: SearchResult[];
  removeParticipant: (userId: string) => void;
}

export const Participants = ({ participants, removeParticipant }: Props) => {
  return (
    <Flex mt={8} gap="10px">
      {participants.map((participant, index) => (
        <Stack
          key={participant.id}
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
        >
          <Text>{participant.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => removeParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};
