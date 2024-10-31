"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignInUserInput, signInUserSchema } from "@/lib/validationSchemas";
import { signInUser } from "@/actions/user/signInUser";
import { toast } from "@/app/hooks/use-toast";

export default function SignIn() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(signInUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: SignInUserInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const result = await signInUser(formData);

            if (result.success) {
                toast({
                    description: "User signed in successfully",
                });
                router.push("/");
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    const handleGuestLogin = () => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", "guest@gmail.com");
            formData.append("password", "guestPassword123");

            const result = await signInUser(formData);

            if (result.success) {
                toast({
                    description: "Guest user signed in successfully",
                });
                router.push("/");
            } else {
                toast({
                    variant: "destructive",
                    description: result.message,
                });
            }
        });
    };

    return (
        <div className="space-y-4 max-w-sm w-full">
            <div className="border p-10 rounded-lg shadow-lg space-y-2">
                <h1 className="text-3xl font-bold">DineDelight</h1>
                <h2 className="text-3xl">Sign in</h2>
                <div
                    className="flex p-2 w-full bg-yellow-100 gap-2 cursor-pointer text-yellow-800 font-bold rounded-lg duration-200"
                    onClick={handleGuestLogin}
                >
                    <ShieldQuestion />
                    <p>Guest Mode</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                onClick={() => router.push("/sign-up")}
                className="border text-center shadow-lg p-4 cursor-pointer rounded-lg"
            >
                <p className="text-sm text-muted-foreground">Create your DineDelight account</p>
            </div>
        </div>
    );
}
