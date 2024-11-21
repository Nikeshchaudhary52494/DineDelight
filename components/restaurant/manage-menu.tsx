import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";

import AddMenuItem from "./add-menu-item";

interface ManageMenuProps {
    restaurantId: string;
}

export default function ManageMenu({ restaurantId }: ManageMenuProps) {
    return (
        <div>
            <h1 className="text-3xl font-semibold">Menu itmes</h1>
            <p className="text-sm text-slate-400">Manage Menu items</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Dish</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                </TableBody>
            </Table>
            <AddMenuItem restaurantId={restaurantId} />
        </div>
    )
}