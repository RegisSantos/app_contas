"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

type AuthenticatedUser = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    fetch(`${apiUrl}/session`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();
        setUser(data.user);
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.welcome}>Olá, {user.name}.</p>
    </section>
  );
}