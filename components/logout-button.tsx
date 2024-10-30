"use client";

import { logoutUser } from "@/actions/user/logoutUser";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const success = await logoutUser();
        if (success.success) {
            router.push("/");
            toast({
                title: "logout successfully"
            })
        } else {
            toast({
                title: "problem in logout"
            })
        }
    };

    return (
        <Button
            className="bg-red-200 font-bold py-2 px-4 rounded-lg text-red-900 hover:underline text-sm"
            onClick={handleLogout}
        >
            Sign Out
        </Button>
    );
};

export default LogoutButton;
