"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface Booking {
    id: string;
    name: string;
}

const dummyBookings: Booking[] = [
    { id: "1", name: "Booking 1" },
    { id: "2", name: "Booking 2" },
    { id: "3", name: "Booking 3" },
];

export default function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
    const [selectedBooking, setSelectedBooking] = useState<string>(bookings[0]?.id);

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-100 border-r border-gray-200">
                <ScrollArea className="p-4">
                    <li>
                        {bookings.map((booking) => (
                            <p
                                key={booking.id}
                                className={cn(
                                    "cursor-pointer p-2 rounded-md",
                                    selectedBooking === booking.id
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-200"
                                )}
                                onClick={() => setSelectedBooking(booking.id)}
                            >
                                {booking.name}
                            </p>
                        ))}
                    </li>
                </ScrollArea>
            </aside>

            <main className="flex-1 p-6">
                {selectedBooking ? (
                    <div>
                        <h2 className="text-xl font-semibold">Booking Details</h2>
                        <p>{bookings.find((b) => b.id === selectedBooking)?.name}</p>
                    </div>
                ) : (
                    <p>Select a booking to view details.</p>
                )}
            </main>
        </div>
    );
}
