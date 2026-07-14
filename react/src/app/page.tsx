// src/app/page.tsx

import { redirect } from "next/navigation";

export default function Home() {
  // futuramente, aqui será verificado se o usuário está autenticado ou não
  // se não houver um usuário autenticado, redireciona para a página de login
  redirect("/login");
}