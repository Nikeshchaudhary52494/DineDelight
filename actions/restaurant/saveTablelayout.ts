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
        update: { rows, cols },
        create: {
            rows, cols, restaurantId
        }
    });

    const seats = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const seatId = `${row}-${col}`;
            seats.push({
                seatId,
                isDisabled: disabledSeats.includes(seatId),
                tableLayoutId: table.id,
            });
        }
    }

    await db.seat.deleteMany({ where: { tableLayoutId: table.id } });
    await db.seat.createMany({
        data: seats
    });
    return table;
}
