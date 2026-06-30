// src/components/PasswordInput.tsx

"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useTogglePassword from "@/hooks/useTogglePassword";

type Props = {
    id: string;
    name: string;
    className?: string;
    placeholder?: string;
};

export default function PasswordInput({
    id,
    name,
    className = "",
    placeholder = "Senha",
}: Props) {
    const { show, togglePassword } = useTogglePassword();

    return (
        <div className="relative w-full">
            <input
                type={show ? "text" : "password"}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`block w-full px-3 pr-10 py-1.5 border border-gray-300 rounded-md shadow-sm
                            focus:outline-1 focus:ring-blue-500 focus:border-blue-500
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white ${className}`}
            />

            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
                onClick={togglePassword}
                aria-label={show ? "Ocultar Senha" : "Exibir Senha"}
                title={show ? "Ocultar Senha" : "Exibir Senha"}
            >
                {show ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ) : (
                    <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    );
}