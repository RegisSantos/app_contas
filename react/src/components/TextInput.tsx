"use client";

type Props = {
    type?: string;
    id: string;
    name: string;
    className?: string;
    placeholder?: string;
    label?: string;
};

export default function TextInput({
    type = "text",
    id,
    name,
    className = "",
    placeholder,
    label,
}: Props) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm
                            focus:outline-1 focus:ring-blue-500 focus:border-blue-500
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white ${className}`}
            />
        </div>
    );
};