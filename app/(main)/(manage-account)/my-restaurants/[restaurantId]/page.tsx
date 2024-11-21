import GoLiveMSG from "@/components/restaurant/goLiveMSG";
import ManageMenu from "@/components/restaurant/manage-menu";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import { Menu, Table as TableIcon } from "lucide-react";

interface ManageMenuProps {
    params: {
        restaurantId: string;
    };
}

export default function Page({ params }: ManageMenuProps) {
    return (
        <div className="p-10 space-y-4">
            <GoLiveMSG />
            <Tabs defaultValue='menu' className='space-y-6'>
                <TabsList className='p-2 bg-slate-200'>
                    <TabsTrigger value='menu' className='data-[state=active]:bg-slate-400 gap-2'>
                        <Menu />
                        Menu Items
                    </TabsTrigger>
                    <TabsTrigger value='table' className='data-[state=active]:bg-slate-400 gap-2'>
                        <TableIcon />
                        Table Layout
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='menu'>
                    <ManageMenu restaurantId={params.restaurantId} />
                </TabsContent>
                <TabsContent value='table'>
                </TabsContent>
            </Tabs>
        </div>
    )
}