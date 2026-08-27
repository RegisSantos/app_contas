import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Navegação principal">
      <strong className={styles.brand}>App Contas</strong>
      <nav>
        <Link className={styles.activeLink} href="/dashboard">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}