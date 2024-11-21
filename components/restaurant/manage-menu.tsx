import { db } from "@/lib/db";
import AddMenuItem from "./add-menu-item";
import Menutable from "./menu-table";
import { revalidatePath } from "next/cache";

interface ManageMenuProps {
    restaurantId: string;
}



export default async function ManageMenu({ restaurantId }: ManageMenuProps) {
    const resturent = await db.restaurant.findUnique({
        where: {
            id: restaurantId
        },
        include: {
            menu: true,
        },
    })
    return (
        <div>
            <h1 className="text-3xl font-semibold">Menu itmes</h1>
            <p className="text-sm text-slate-400">Manage Menu items</p>
            <Menutable menuItems={resturent?.menu!} />
            <AddMenuItem restaurantId={restaurantId} />
        </div>
    )
}