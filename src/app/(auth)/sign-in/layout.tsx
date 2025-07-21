
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "signin meta data title",
  description: "signin meta data description",
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
    {/* <h1>Sign In Layout</h1> */}
        {children}
    </>
  );

}