"use client";

import Image from "next/image";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
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
      <main className="flex flex-col items-center justify-center gap-4 w- p-10
                      bg-white border border-solid border-gray-200 rounded-lg shadow-lg text-gray-600
                      dark:bg-white/5 dark:border-gray-500 dark:text-slate-200 dark:shadow-white/10 sm:items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={140}
          height={60}
          priority
        />
        <h1 className="text-2xl font-bold">Login</h1>
        <form action="#" method="POST" id="frmLogin">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-12">
              <div className="flex flex-col gap-2">
                <TextInput
                  id="iUser"
                  name="iUser"
                  type="text"
                  className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                            dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                            focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                  placeholder="Código ou Email"
                />
                <PasswordInput
                  id="iPass"
                  name="iPass"
                  className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                            dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                            focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
          </div>
       </form>
      </main>
    </div>
  );
}
