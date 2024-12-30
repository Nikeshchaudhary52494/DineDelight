import { MenuItem } from "@prisma/client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Order {
    [id: string]: number;
}

interface OrderContextType {
    selectedTime: string | null;
    setSelectedTime: (time: string) => void;
    currentSelectedSeat: string;
    setCurrentSelectedSeat: (seat: string) => void;
    order: Order;
    setOrder: (order: Order) => void;
    handleAddItem: (item: MenuItem) => void;
    handleRemoveItem: (item: MenuItem) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export type Props = {
    children: ReactNode;
};

export const MyOrderContextProvider: React.FC<Props> = ({ children }) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentSelectedSeat, setCurrentSelectedSeat] = useState<string>("");
    const [order, setOrder] = useState<Order>({});

    const handleAddItem = (item: MenuItem) => {
        setOrder((prev) => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1,
        }));
    };

    const handleRemoveItem = (item: MenuItem) => {
        setOrder((prev) => {
            const updated = { ...prev };
            if (updated[item.id] > 1) {
                updated[item.id] -= 1;
            } else {
                delete updated[item.id];
            }
            return updated;
        });
    };

    return (
        <OrderContext.Provider
            value={{
                selectedTime,
                setSelectedTime,
                currentSelectedSeat,
                setCurrentSelectedSeat,
                order,
                setOrder,
                handleAddItem,
                handleRemoveItem
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};
