"use client";

import { saveTable } from "@/actions/restaurant/saveTablelayout";
import { toast } from "@/app/hooks/use-toast";
import React, { useState } from "react";
// import { selectSeats } from "@/app/actions/selectSeats";

interface SeatReservationProps {
    mode: "user" | "host";
    tableId: string;
    restaurantId: string
}

export default function TableGrid({ mode, restaurantId, tableId }: SeatReservationProps) {

    const [rows, setRows] = useState<number>(5);
    const [cols, setCols] = useState<number>(8);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [disabledSeats, setDisabledSeats] = useState<string[]>([]);
    const [disableMode, setDisableMode] = useState<boolean>(false);

    const handleSeatClick = (row: number, col: number) => {
        const seatId = `${row}-${col}`;

        if (mode === "host" && disableMode) {
            if (disabledSeats.includes(seatId)) {
                setDisabledSeats(disabledSeats.filter((seat) => seat !== seatId));
            } else {
                setDisabledSeats([...disabledSeats, seatId]);
            }
        } else if (mode === "user") {
            if (!disabledSeats.includes(seatId)) {
                if (selectedSeats.includes(seatId)) {
                    setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
                } else {
                    setSelectedSeats([...selectedSeats, seatId]);
                }
            }
        }
    };

    const renderGrid = () => {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const rowCells = [];
            for (let col = 0; col < cols; col++) {
                const seatId = `${row}-${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isDisabled = disabledSeats.includes(seatId);

                rowCells.push(
                    <div
                        key={seatId}
                        className={`w-10 h-10 m-1 flex items-center justify-center border rounded-lg cursor-pointer ${isDisabled
                            ? "bg-red-500 cursor-not-allowed"
                            : isSelected
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                        onClick={() => handleSeatClick(row, col)}
                    >
                        {seatId}
                    </div>
                );
            }
            grid.push(
                <div key={row} className="flex justify-center">
                    {rowCells}
                </div>
            );
        }
        return grid;
    };

    const handleSave = async () => {
        if (mode !== "host") return;
        try {
            await saveTable({
                tableId,
                rows,
                cols,
                disabledSeats,
                restaurantId
            });
            toast({ description: "Table layout saved!" });
        } catch (error) {
            console.error(error);
            alert("Failed to save table configuration.");
        }
    };

    const handleUserSelection = async () => {
        if (mode !== "user") return;
        try {
            // await selectSeats({ tableId, selectedSeats });
            alert("Seats selected!");
        } catch (error) {
            console.error(error);
            alert("Failed to select seats.");
        }
    };

    return (
        <div className="p-4">
            {mode === "host" && (
                <div className="flex items-end justify-center mb-4 space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rows</label>
                        <input
                            type="number"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="block w-16 p-2 mt-1 border border-gray-300 rounded-md"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Columns</label>
                        <input
                            type="number"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="block w-16 p-2 mt-1 border border-gray-300 rounded-md"
                            min="1"
                        />
                    </div>
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                        onClick={() => setDisableMode(!disableMode)}
                    >
                        {disableMode ? "Exit Disable Mode" : "Disable Seats"}
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-green-500 rounded-lg"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            )}

            <div className="flex flex-col items-center">{renderGrid()}</div>

            {mode === "user" && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold text-center">Selected Seats:</h2>
                    {selectedSeats.length > 0 ? (
                        <ul className="mt-2 text-center">
                            {selectedSeats.map((seat) => (
                                <li key={seat}>{seat}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">No seats selected.</p>
                    )}
                    <button
                        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
                        onClick={handleUserSelection}
                    >
                        Confirm Selection
                    </button>
                </div>
            )}
        </div>
    );
}
