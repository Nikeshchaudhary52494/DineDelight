"use server";

import { db } from "@/lib/db";

interface saveTableLayoutProps {
    tableId: string;
    restaurantId: string,
    rows: number;
    cols: number;
    disabledSeats: string[];
}
export async function saveTable({
    tableId,
    restaurantId,
    rows,
    cols,
    disabledSeats,
}: saveTableLayoutProps) {

    const table = await db.tableLayout.upsert({
        where: {
            id: tableId
        },
        update: {
            rows,
            cols,
            disabledSeats
        },
        create: {
            rows,
            cols,
            restaurantId,
            isInitail: false
        }
    });

    return table;
}
