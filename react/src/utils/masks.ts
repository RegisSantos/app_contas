// src/utils/masks.ts

export function phoneMask(value: string): string {

    // mantém apenas números
    const numbers = value.replace(/\D/g, "");

    // limita em 11 dígitos
    const limited = numbers.slice(0, 11);

    // (XX) XXXXX-XXXX
    if (limited.length <= 2) {
        return limited;
    }

    if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    }

    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;

}