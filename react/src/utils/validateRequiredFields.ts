// src/utils/validateRequiredFields.ts

import toast from "react-hot-toast";

export default function validateRequiredFields(
    form: HTMLFormElement
): boolean {

    // function handleToastSuccess() {
    //   toast.success("Mensagem de sucesso!");
    // }

    // function handleToastError() {
    //   toast.error("Mensagem de erro!");
    // }

    function handleToastWarning(msg: string) {
      toast(msg, {
        icon: '⚠️',
        style: {
          background: '#fde68a',
          color: '#92400e',
          border: '1px solid #fde68a'
        }
      });
    }

    const fields = form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("[data-required]");

    for (const field of fields) {

        const value = field.value.trim();

        if (!value) {

            const label =
                field.getAttribute("data-label") ||
                field.getAttribute("placeholder") ||
                field.name ||
                "Campo";

            handleToastWarning(`O campo "${label}" deve ser preenchido!`)

            field.focus();

            return false;
        }
    }

    return true;
}