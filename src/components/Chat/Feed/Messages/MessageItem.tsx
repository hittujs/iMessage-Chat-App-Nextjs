import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";
import { MessagePopulated } from "../../../../../../backend/src/util/types";

interface Props {
  message: MessagePopulated;
  sentByMe: boolean;
}

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "`Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

export const MessageItem: React.FC<Props> = ({ message, sentByMe }) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: "whiteAlpha.200" }}
      //   justify={sentByMe ? "right" : "left"}
      wordBreak="break-word"
      border="1px solid red"
    >
      {!sentByMe && (
        <Flex>
          <Avatar size="sm"></Avatar>
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          // justify={}
        >
          {!sentByMe && (
            <Text fontWeight={500} textAlign="left">
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formatRelative(message.createdAt, new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },
            })}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
