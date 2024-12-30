"use client"

import React, { useState } from "react";

// interface TimeSelectorProps {
//     onTimeSelect: (timeSlot: string) => void;
// }

const TimeSelector = () => {
    const timeSlots = [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 2:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
        "6:00 PM - 8:00 PM",
        "8:00 PM - 10:00 PM",
    ];

    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleSelect = (timeSlot: string) => {
        setSelectedTime(timeSlot);
        // onTimeSelect(timeSlot);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm font-medium">Select a time slot:</p>
            <div className="flex flex-wrap gap-4">
                {timeSlots.map((slot, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(slot)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium 
                            ${selectedTime === slot ? "bg-blue-300 text-blue-500 font-bold hover:bg-blue-200" : "bg-white text-gray-700 border-gray-300"}
                            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSelector;
