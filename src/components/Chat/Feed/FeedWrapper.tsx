import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session;
}

export const FeedWrapper: React.FC<Props> = ({ session }: Props) => {
  return <div>FeedWrapper</div>;
};
