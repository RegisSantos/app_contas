// src/components/Select.tsx

"use client";

type Option = {
    value: string;
    label: string;
};

type Props = {
    id: string;
    name: string;
    className?: string;
    label?: string;
    options: Option[];
    value?: string;
    onChange?: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
};

export default function Select({
    id,
    name,
    className = "",
    label,
    options,
    value = "",
    onChange,
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

            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm cursor-pointer
                            focus:outline-1 focus:ring-blue-500 focus:border-blue-500
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-gray-500 ${className}`}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};