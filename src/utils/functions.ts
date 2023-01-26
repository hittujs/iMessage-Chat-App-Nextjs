export const formatUsernames = (
  participants: any,
  myUserId: string
): string => {
  const usernames = participants
    .filter((p: any) => p.user.id != myUserId)
    .map((p: any) => p.user.username);

  return usernames.join(", ");
};
