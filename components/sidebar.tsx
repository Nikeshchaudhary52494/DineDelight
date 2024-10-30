"use client";

import { CookingPot, Settings, UserPen } from "lucide-react";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navigationLinks = [
    { route: "/profile", label: "Profile", icon: UserPen },
    { route: "/dashboard", label: "Dashboard", icon: GoHome },
    { route: "/resturent", label: "Resturent", icon: CookingPot },
    { route: "/settings", label: "Settings", icon: Settings },
];


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-[250px] h-full p-10 border-r">
            <ul className="space-y-4">
                {navigationLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.route;

                    return (
                        <Link key={item.route} href={item.route}>
                            <li
                                className={clsx(
                                    "flex items-center gap-2 p-2 rounded-lg",
                                    isActive && "bg-slate-300"
                                )}
                            >
                                <Icon size={20} />
                                {item.label}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}
