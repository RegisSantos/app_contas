"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import useToggleFade from "@/hooks/useToggleFade";
// import toast from "react-hot-toast";

export default function Home() {

  const stepRef = useRef<HTMLDivElement>(null);

  const { currentStep, changeStep } = useToggleFade({
    initialStep: "step1",
    clearOnChange: true,

    containerRef: stepRef,
  });

  const logo = <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={140}
                height={60}
                priority
              />

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
      <main>

        <AnimatePresence mode="wait">

          {currentStep === "step1" && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 w- p-10
                        bg-white border border-solid border-gray-300 rounded-lg shadow-lg text-gray-600
                        dark:bg-white/5 dark:border-gray-500 dark:text-slate-200 dark:shadow-white/10 sm:items-center"
            >
              { logo }
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
                    <div className="flex flex-col gap-2 mt-2 items-end">
                      <button
                      type="button"
                        className="inline-flex text-sm text-gray-500 me-2 cursor-pointer hover:text-gray-400
                                  dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => changeStep("step2")}
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 items-center">
                      <input type="submit" value="Entrar"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
                        onClick={ () => alert("Aplicar método de login!") }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === "step2" && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 w- p-10
                        bg-white border border-solid border-gray-300 rounded-lg shadow-lg text-gray-600
                        dark:bg-white/5 dark:border-gray-500 dark:text-slate-200 dark:shadow-white/10 sm:items-center"
            >
              { logo }
              <h1 className="text-2xl font-bold">Recuperar Senha</h1>
              <form action="#" method="POST" id="frmStep2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-12">
                    <div className="flex flex-col gap-2">
                      <TextInput
                        id="iUserRec"
                        name="iUserRec"
                        type="text"
                        className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                                  dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                                  focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                        placeholder="Código ou Email"
                      />
                      <select className="block w-full bg-white/5 border border-solid border-gray-400 rounded-md text-base text-gray-400 sm:text-sm/6 cursor-pointer px-3 py-2
                                  dark:border-gray-600 dark:bg-white/10 dark:text-gray-500 dark:focus:outline-gray-500
                                  focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400">
                        <option value="">Selecione uma opção</option>
                        <option value="email">Email</option>
                        <option value="phone">Telefone</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 items-center">
                      <button
                      type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer w-23
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
                        onClick={() => changeStep("step1")}
                      >
                        Voltar
                      </button>
                      <input type="submit" value="Avançar"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
                        onClick={ () => alert("Aplicar próximo step!") }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
