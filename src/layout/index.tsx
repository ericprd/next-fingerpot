import Link from "next/link";
import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <main>
      <nav className="space-x-5 p-5 bg-white text-black font-bold text-2xl shadow-md fixed w-full">
        <Link href={"/register"}>Register</Link>
        <Link href={"/users"}>Users</Link>
      </nav>

      <section className="flex items-center justify-center h-[100dvh]">
        {children}
      </section>
    </main>
  );
}
