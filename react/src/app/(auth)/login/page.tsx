"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {

  // function handleToastSuccess() {
  //   toast.success("Mensagem de sucesso!");
  // }

  // function handleToastError() {
  //   toast.error("Mensagem de erro!");
  // }

  // function handleToastWarning() {
  //   toast("Mensagem de aviso!", {
  //     icon: '⚠️',
  //     style: {
  //       background: '#fde68a',
  //       color: '#92400e',
  //       border: '1px solid #fde68a'
  //     }
  //   });
  // }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex flex-col flex-col items-center justify-center p-10 gap-4
                      bg-white border border-solid border-gray-200 rounded-lg shadow-md text-slate-700
                      dark:bg-black dark:border-gray-500 dark:text-slate-200 sm:items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={140}
          height={60}
          priority
        />
        <h1 className="text-2xl font-bold">Login</h1>
      </main>
    </div>
  );
}
