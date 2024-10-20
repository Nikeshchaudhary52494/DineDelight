"use client"
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [profileOpen, setProfileOpen] = useState(false);
    return (
        <div className="flex justify-between p-4 border-b ">
            <div>
                <Link href={"/"}>
                    <h1 className="text-3xl font-bold cursor-pointer">DineDelight</h1>
                </Link>
            </div>
            {/* <div className="space-x-2">
                <Button
                    onClick={() => router.push("/sign-in")}
                    className="transition duration-200 border rounded-full bg-slate-950">
                    Login
                </Button>
                <Button
                    onClick={() => router.push("/sign-up")}
                    className="transition duration-200 border rounded-full bg-slate-950">
                    signup
                </Button>
            </div> */}
            <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative p-2 rounded-full bg-secondary" >
                <UserRound className="cursor-pointer" />
                {
                    profileOpen && (
                        <div className="absolute z-10 top-12 right-2">
                            {/* <Profile /> */}
                        </div>
                    )
                }
            </div>
        </div>
    )
}