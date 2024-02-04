"use client";

import { Button } from "./button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      className="p-4 text-center mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl ">
        <span className="font-bold text-5xl md:text-[90px] bg-gradient-to-r from-indigo-600 via-purple-500 to-red-500 text-transparent bg-clip-text">
          Evento
        </span>{" "}
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          v.0.0
        </span>
        <p className="md:text-[42px] dark:text-slate-300">development build</p>
      </h2>
      <div className="mt-8">
        <Link href="/login">
          <Button className="text-2xl p-8 w-72">Login</Button>
        </Link>
      </div>
    </motion.div>
  );
}
