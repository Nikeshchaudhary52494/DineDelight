import * as motion from "framer-motion/client"
import { IoLocationSharp } from "react-icons/io5";
import { FaShare } from "react-icons/fa";

import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/restaurant/rating-stars";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import MyCarousel from "@/components/restaurant/my-carousel";
import Menutable from "@/components/restaurant/menu-table";


interface PageProps {
    params: {
        restaurantId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const resturent = await db.restaurant.findUnique({
        where: {
            id: params.restaurantId
        },
        include: {
            menu: true,
        },
    })
    return (
        <div className="max-w-6xl p-4 mx-auto space-y-20">
            <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "none" }}
                transition={{ duration: 0.5 }}
                className="flex">
                <div
                    className="w-[50%] flex relative justify-center flex-col">
                    <FaShare size={20} className="absolute text-blue-400 cursor-pointer top-5 right-10" />
                    <h4 className="text-5xl font-bold">{resturent?.name}</h4>
                    <p className="text-slate-400">{resturent?.tagline}</p>
                    <RatingStars rating={2} />
                    <p className="flex items-center py-2">
                        <IoLocationSharp size={20} /> {resturent?.location}
                    </p>
                    <div className="">
                        <h4 className="text-2xl font-semibold">
                            Cuisine Type
                        </h4>
                        <p className="">{resturent?.cuisineType}</p>
                    </div>
                    <div className="mt-10">
                        <Link href={`/restaurant/${params.restaurantId}/book-table`}>
                            <Button
                                className="bg-yellow-500">
                                book a table
                            </Button>
                        </Link>
                    </div>
                </div>
                <MyCarousel images={[resturent?.coverImage!]} />
            </motion.div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="menu-items">
                        <AccordionTrigger>Available food items</AccordionTrigger>
                        <AccordionContent>
                            <Menutable menuItems={resturent?.menu!} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="contact-info">
                        <AccordionTrigger>Contact Information</AccordionTrigger>
                        <AccordionContent>
                            <div>
                                Contact info Here
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
