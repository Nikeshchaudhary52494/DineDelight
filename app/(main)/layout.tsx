import type { Metadata } from "next";
import NavBar from "@/components/navBar";
import { getUser } from "@/actions/user/getUser";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = await getUser();
    return (
        <>
            <NavBar isUser={user ? true : false} />
            {children}
        </>

    );
}