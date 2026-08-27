import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./system.module.css";

export default function SystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}