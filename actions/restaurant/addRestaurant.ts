"use server";

import { db } from "@/lib/db";
import { addRestaurantSchema } from "@/lib/validationSchemas";

export const addRestaurant = async (formData: FormData) => {
    console.log(formData)

    const parsedData = addRestaurantSchema.safeParse({
        name: formData.get("name"),
        location: formData.get("location"),
        coverImage: formData.get("coverImage"),
        openTiming: formData.get("openTiming"),
    });

    if (!parsedData.success) {
        console.log("error")
        return { success: false, errors: parsedData.error.flatten() };
    }

    const { name, location, coverImage, openTiming } = parsedData.data;

    const newRestaurant = await db.restaurant.create({
        data: {
            name,
            location,
            coverImage,
            openTiming
        },
    });

    console.log(name);

    return { success: true, message: "Restaurant added successfully", restaurant: newRestaurant };
};
