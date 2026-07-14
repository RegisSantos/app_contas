// src/utils/validateRecoveryMethod.ts

import toast from "react-hot-toast";

type Props = {
    method: string;
    email: string;
    phone: string;
};

export default function validateRecoveryMethod({
    method,
    email,
    phone,
}: Props): boolean {

    if (method === "email") {

        const at = email.indexOf("@");
        const dotCom = email.lastIndexOf(".com");

        const isValid =
            at > 0 &&
            dotCom > at + 2 &&
            dotCom === email.length - 4;

        if (!isValid) {

            toast.error("Email informado em formato incorreto!");
            return false;
        }

        // remover essa validação depois que o backend estiver pronto para receber qualquer email
        if (email !== "admin@contasgo.com") {
            toast.error("Email não encontrado! Tente novamente!");
            return false;
        }
    }

    if (method === "phone") {

        const numbers = phone.replace(/\D/g, "");

        if (numbers.length !== 11 || numbers === "00000000000") {

            toast.error("Telefone informado incompleto!");
            return false;
        }

        // remover essa validação depois que o backend estiver pronto para receber qualquer telefone
        if (phone !== "(48) 99140-5911") {
            toast.error("Telefone não encontrado! Tente novamente!");
            return false;
        }
    }

    return true;

}