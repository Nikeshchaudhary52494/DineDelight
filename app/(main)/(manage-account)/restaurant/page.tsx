import { getUser } from "@/actions/user/getUser";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const { user } = await getUser()
    const myRestaurants = await db.restaurant.findMany({
        where: {
            ownerid: user?.id
        }
    })
    return (
        <div className="w-full p-10 space-y-4">
            <h2 className="text-3xl font-bold">Manage your restaurants</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href={"restaurant/add-restaurant"} >
                    <div className="relative flex items-center space-x-4">
                        <div className="flex items-center justify-center w-full rounded-lg shadow-xl cursor-pointer h-60">
                            <Plus size={40} className="p-2 border border-dashed rounded-full" />
                        </div>
                        <span className="absolute text-sm text-gray-500 top-[60%] w-full text-center">Add New Restaurant</span>
                    </div>
                </Link>
                {myRestaurants.map((restaurant) => (
                    <div className="rounded-lg shadow-lg">
                        <div key={restaurant.id} className="overflow-hidden relative rounded-t-lg h-40 w-full ">
                            <Image
                                src={restaurant.coverImage}
                                alt={`${restaurant.name} image`}
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-600">{restaurant.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
