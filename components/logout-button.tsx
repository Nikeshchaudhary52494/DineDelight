"use client";

import { logoutUser } from "@/actions/user/logoutUser";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const result = await logoutUser();

            if (result.success) {
                toast({ title: "Logged out successfully" });
                router.push("/");
            } else {
                toast({ title: "Problem logging out", description: "Please try again later." });
            }
        } catch (error) {
            toast({ title: "An error occurred", description: "Unable to log out at this time." });
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
