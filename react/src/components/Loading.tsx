// src/components/Loading.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
    show: boolean;
};

export default function Loading({ show }: Props) {

    return (

        <AnimatePresence>

            {show && (

                <motion.div
                    className="
                        fixed inset-0
                        z-50
                        flex items-center justify-center
                        bg-black/40
                        backdrop-blur-sm
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: .9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: .9
                        }}
                        animate={{
                            opacity: .9,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            scale: .9
                        }}
                        transition={{
                            duration: .25
                        }}
                        className="flex flex-col items-center gap-4"
                    >

                        <div
                            className="
                                w-12 h-12
                                border-4
                                border-white/30
                                border-t-white
                                rounded-full
                                animate-spin
                            "
                        />

                        <span className="text-white text-lg font-semibold">
                            Aguarde...
                        </span>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}