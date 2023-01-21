import { Inter } from "@next/font/google";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { Box } from "@chakra-ui/react";
import { Chat } from "@/components/Chat";
import { Auth } from "@/components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  // to re fetch session as soon as we have username available
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  console.log(session?.user, "session?.user");

  return (
    <Box>
      {session?.user.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
