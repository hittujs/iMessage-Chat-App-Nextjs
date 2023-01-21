import { Inter } from "@next/font/google";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { Box } from "@chakra-ui/react";
import { Chat } from "@/components/Chat";
import { Auth } from "@/components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  return <Box>{data?.user ? <Chat /> : <Auth />}</Box>;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
