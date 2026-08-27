"use client";

import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import styles from "./Sidebar.module.css";

const LOGIN_TOAST_DURATION = 2500;
const LOGIN_PROCESSING_DELAY = 1500;
const LOADING_EXIT_DELAY = 500;

export default function Sidebar() {
  const router = useRouter();
  const { loading, showLoading, hideLoading } = useLoading();

  async function handleLogout() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    showLoading();

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, LOGIN_PROCESSING_DELAY);
      });

      const response = await fetch(`${apiUrl}/logout`, {
          method: "POST",
          credentials: "include",
        });

      if (!response.ok) {
        throw new Error("Não foi possível encerrar a sessão.");
      }

      toast.success("Sessão encerrada!", {
        duration: LOGIN_TOAST_DURATION,
      });

      setTimeout(() => {
        hideLoading();
        router.replace("/login");
      }, LOGIN_TOAST_DURATION + LOADING_EXIT_DELAY);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível encerrar a sessão.",
        { duration: LOGIN_TOAST_DURATION }
      );

      setTimeout(() => {
        hideLoading();
      }, LOGIN_TOAST_DURATION + LOADING_EXIT_DELAY);
    }
  }

  return (
    <aside className={styles.sidebar} aria-label="Navegação principal">
      <Loading show={loading} />
      <strong className={styles.brand}>App Contas</strong>
      <nav>
        <Link className={styles.activeLink} href="/dashboard">
          Dashboard
        </Link>
      </nav>
      <button
        className={styles.logoutButton}
        type="button"
        aria-label="Sair"
        title="Sair"
        onClick={handleLogout}
      >
        <PowerIcon aria-hidden="true" />
        <span className={styles.logoutTooltip} role="tooltip">
          Sair
        </span>
      </button>
    </aside>
  );
}