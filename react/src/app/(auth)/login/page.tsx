// src/app/(auth)/login/page.tsx

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
import toast from "react-hot-toast";
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import Select from "@/components/Select";
import Logo from "@/components/Logo";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import useToggleFade from "@/hooks/useToggleFade";
import { phoneMask } from "@/utils/masks";
import validateRequiredFields from "@/utils/validateRequiredFields";

export default function Home() {

  const stepRef = useRef<HTMLDivElement>(null);
  const [ phone, setPhone ] = useState("");
  const [recoveryMethod, setRecoveryMethod] = useState("");
  const [email, setEmail] = useState("");

  const { currentStep, changeStep } = useToggleFade({
    initialStep: "step1",
    clearOnChange: true,

    containerRef: stepRef,
  });

  const { loading, showLoading, hideLoading } = useLoading();

  // const logo = <Image
  //               className="dark:invert"
  //               src="/next.svg"
  //               alt="Next.js logo"
  //               width={140}
  //               height={60}
  //               priority
  //             />

  const logo = <Logo />;

  function handleToastSuccess(msg: string) {
    toast.success(msg);
  }

  function handleToastError(msg: string) {
    toast.error(msg);
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const form = e.currentTarget;

    // Validação dos campos obrigatórios
    if (!validateRequiredFields(form)) {
        return;
    }

    // Obtém os valores do formulário
    const formData = new FormData(form);

    const user = String(formData.get("iUser") ?? "").trim();
    const pass = String(formData.get("iPass") ?? "");

    showLoading();

    setTimeout(() => {

        const loginOk =
            (user === "4893" || user === "admin@contasgo.com") &&
            pass === "adminsenha0";

        if (loginOk) {

            handleToastSuccess("Login efetuado com sucesso!");

            // Futuramente:
            // form.submit();

        } else {

            handleToastError("Usuário e/ou Senha incorretos!");

        }

    }, 3000);

    setTimeout(() => {
        hideLoading();
    }, 5000);

  }

  function handleMethod(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateRequiredFields(e.currentTarget)) {
        return;
    }

    changeStep("step3")
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">

      <Loading show={loading} />

      <main>

        <AnimatePresence mode="wait">

          {currentStep === "step1" && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-3 p-10
                        bg-white border border-solid border-gray-300 rounded-lg shadow-lg text-gray-600
                        dark:bg-white/5 dark:border-gray-500 dark:text-slate-200 dark:shadow-white/10 sm:items-center"
            >
              { logo }
              <h1 className="text-2xl font-bold mb-1">Login</h1>
              <form id="frmStep1" onSubmit={ handleLogin }>
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
                        data-label="Código / Email"
                        data-required
                      />
                      <PasswordInput
                        id="iPass"
                        name="iPass"
                        className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                                  dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                                  focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                        placeholder="Digite sua senha"
                        data-label="Senha"
                        data-required
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-2 items-end">
                      <button
                      type="button"
                        className="inline-flex text-sm text-gray-500 me-2 cursor-pointer hover:text-blue-500
                                  dark:text-gray-400 dark:hover:text-blue-500"
                        onClick={() => changeStep("step2")}
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 items-center">
                      <input type="submit" value="Entrar"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer w-25
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
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
              className="flex flex-col items-center justify-center gap-3 p-10
                        bg-white border border-solid border-gray-300 rounded-lg shadow-lg text-gray-600
                        dark:bg-white/5 dark:border-gray-500 dark:text-slate-200 dark:shadow-white/10 sm:items-center"
            >
              { logo }
              <h1 className="text-2xl font-bold mb-1">Escolher método</h1>
              <form id="frmStep2" onSubmit={ handleMethod }>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-12">
                    <div className="flex flex-col gap-2">
                      <Select
                        id="sMethod"
                        name="sMethod"
                        value={ recoveryMethod }
                        onChange={(e) => {
                          const method = e.target.value;
                          setRecoveryMethod(method);

                          // Limpar os campos de email e telefone ao mudar o método
                          setEmail("");
                          setPhone("");
                        }}
                        options={[
                          {
                            value: "",
                            label: "Selecione uma opção",
                          },
                          {
                            value: "email",
                            label: "Email",
                          },
                          {
                            value: "phone",
                            label: "Telefone",
                          },
                        ]}
                        className="block w-full bg-white/5 border border-solid border-gray-400 rounded-md text-base text-gray-400 sm:text-sm/6 px-3 py-2
                                  focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400
                                  dark:border-gray-600 dark:bg-white/10 dark:text-gray-400 dark:focus:outline-gray-500"
                        data-label="Método de recuperação"
                        data-required
                      >
                      </Select>

                      { recoveryMethod === "email" && (
                        <TextInput
                          id="iEmailRec"
                          name="iEmailRec"
                          type="text"
                          value={ email }
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                                    dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                                    focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                          placeholder="seu email"
                          data-label="Email"
                          data-required
                        />
                      )}

                      { recoveryMethod === "phone" && (
                        <TextInput
                          id="iPhoneRec"
                          name="iPhoneRec"
                          type="text"
                          value={ phone }
                          onChange={(e) => setPhone(phoneMask(e.target.value))}
                          className="bg-white/5 border-gray-400 text-base text-gray-600 placeholder:text-gray-400[/10] sm:text-sm/6
                                    dark:border-gray-400 dark:bg-white/10 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:outline-gray-500
                                    focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                          placeholder="seu telefone"
                          data-label="Telefone"
                          data-required
                        />
                      )}

                    </div>
                    <div className="flex flex-col gap-2 mt-4 items-center">
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer w-25
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
                        onClick={() => {
                            setRecoveryMethod("");
                            setEmail("");
                            setPhone("");
                            changeStep("step1");
                        }}
                      >
                        Voltar
                      </button>
                      <input type="submit" value="Avançar"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer w-25
                                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                  dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800"
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
