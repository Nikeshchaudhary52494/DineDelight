import TableGrid from "@/components/restaurant/table-grid";
import { db } from "@/lib/db";

interface PageProps {
    params: {
        restaurantId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: params.restaurantId
        },
        select: {
            tableLayout: true
        }
    })
    return (
        <div>
            <TableGrid
                mode="user"
                tableLayout={restaurant?.tableLayout!}
                restaurantId={params.restaurantId} />
        </div>
    )
}