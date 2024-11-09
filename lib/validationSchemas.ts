import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signInUserSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const addRestaurantSchema = z.object({
    name: z.string().min(1, "Restaurant name is required"),
    tagline: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    coverImage: z.string().url("Cover image must be a valid URL"),
    openTiming: z.string(),
    cuisineType: z.string().default("mix"),
});

export type AddRestaurantInput = z.infer<typeof addRestaurantSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type SignInUserInput = z.infer<typeof signInUserSchema>;