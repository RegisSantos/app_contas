// src/hooks/useToggleFade.ts

"use client";

import { useState, RefObject } from "react";

type UseToggleFadeProps = {
  initialStep: string;
  clearOnChange?: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
};

export default function useToggleFade({
  initialStep,
  clearOnChange = false,
  containerRef,
}: UseToggleFadeProps) {

  const [currentStep, setCurrentStep] = useState(initialStep);

  const clearFields = () => {

    if (!containerRef?.current) {
      return;
    }

    // INPUTS
    const inputs = containerRef.current.querySelectorAll("input");

    inputs.forEach((input) => {

      const field = input as HTMLInputElement;

      // ignora botões
      if (
        field.type !== "button" &&
        field.type !== "submit" &&
        field.type !== "checkbox" &&
        field.type !== "radio"
      ) {
        field.value = "";
      }

    });

    // TEXTAREAS
    const textareas = containerRef.current.querySelectorAll("textarea");

    textareas.forEach((textarea) => {
      textarea.value = "";
    });

    // SELECTS
    const selects = containerRef.current.querySelectorAll("select");

    selects.forEach((select) => {
      select.selectedIndex = 0;
    });

  };

  const changeStep = (nextStep: string) => {

    // limpa campos se habilitado
    if (clearOnChange) {
      clearFields();
    }

    // troca step
    setCurrentStep(nextStep);

  };

  return {
    currentStep,
    changeStep,
  };

}