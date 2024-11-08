import { Plus } from "lucide-react";
import Link from "next/link";
// import { getAllResturents } from "@/actions/restaurant/getAllResturents"; // Update this path as necessary

export default async function Page() {
    // const resturents = await getAllResturents();

    return (
        <div className="p-10 w-full space-y-4">
            <h2 className="text-3xl font-bold">Manage your restaurants</h2>

            {/* Add New Restaurant Button */}
            <Link href={"restaurant/add-restaurant"} >
                <div className="flex relative items-center space-x-4">
                    <div className="shadow-xl flex justify-center items-center w-40 h-60 rounded-lg cursor-pointer">
                        <Plus size={40} className="border-dashed border rounded-full p-2" />
                    </div>
                    <span className="text-gray-500 absolute top-[60%] text-sm">Add New Restaurant</span>
                </div>
            </Link>

            {/* Restaurants List */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resturents.map((restaurant) => (
                    <div key={restaurant.id} className="shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={restaurant.imageUrl}
                            alt={`${restaurant.name} image`}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-600">{restaurant.location}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
