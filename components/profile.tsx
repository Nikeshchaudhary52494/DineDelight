import { getUser } from "@/actions/user/getUser"

import LogoutButton from "./logout-button";

export default async function Profile() {
    const { user } = await getUser();
    return (
        <div className="p-10 space-y-6 max-w-lg">
            <h2 className="text-3xl font-bold text-gray-800">Account Details</h2>

            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-black rounded-full overflow-hidden">
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800 uppercase">{user?.name}</span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
            </div>

            <div className="space-y-1">
                <p className="font-semibold text-gray-700">Edit Personal Information</p>
                <button className="text-slate-400 text-xs">Change your Profile Name or Email</button>
            </div>

            <button className="text-slate-400 hover:underline text-sm">Change Password</button>

            <div className="space-y-2">
                <LogoutButton />
            </div>
        </div>
    )
}