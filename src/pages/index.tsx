import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { signIn, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();

  return (
    <div>
      <button onClick={() => signIn("google")}>Sign In User</button>
    </div>
  );
}
