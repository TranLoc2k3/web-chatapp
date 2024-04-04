"use client";

import { SessionProvider } from "next-auth/react";

function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}

export default NextAuthProvider;
