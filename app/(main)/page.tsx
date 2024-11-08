import { db } from "@/lib/db";
import Image from "next/image";
import * as motion from "framer-motion/client";
import Link from "next/link";
import RestaurantGrid from "@/components/restaurant/resturentgrid";

export default async function Home() {

  return (
    <div className="max-w-6xl p-4 mx-auto space-y-4">
      {/* <SearchBar /> */}
      <h2 className="text-5xl font-bold">Top resturents near you</h2>
      <RestaurantGrid />
      {/* <MyPagination /> */}
    </div>
  );
}
