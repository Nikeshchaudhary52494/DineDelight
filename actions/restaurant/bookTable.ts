"use server";

import { db } from "@/lib/db";

interface BookTableLayoutProps {
    tableId: string
    userId: string
    seatId: string
}
export async function bookTable({
    userId,
    tableId,
    seatId
}: BookTableLayoutProps) {

    const booking = await db.seatBooking.create({
        data: {
            seatNumber: seatId,
            userId,
            tableLayoutId: tableId
        },
    });

    await db.tableLayout.update({
        where: { id: tableId },
        data: {
            selectedSeats: {
                push: seatId,
            },
        },
    });
    return booking;
}
