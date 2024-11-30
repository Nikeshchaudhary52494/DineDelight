import AddMenuItem from "./add-menu-item";
import Menutable from "./menu-table";
import { MenuItem } from "@prisma/client";

interface ManageMenuProps {
    menu: MenuItem[];
}

export default function ManageMenu({ menu }: ManageMenuProps) {
    return (
        <div>
            <h1 className="text-3xl font-semibold">Menu itmes</h1>
            <p className="text-sm text-slate-400">Manage Menu items</p>
            <Menutable menuItems={menu} />
            <AddMenuItem restaurantId={menu[0].restaurantId} />
        </div>
    )
}