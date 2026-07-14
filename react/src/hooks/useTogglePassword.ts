// src/hooks/useTogglePassword.ts

import { useState } from "react";

export default function useTogglePassword() {
    const [show, setShow] = useState(false);

    const togglePassword = () => {
        setShow((prev) => !prev);
    }

    return { show, togglePassword };
}