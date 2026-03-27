import Link from "next/link";

export default function FloatingActionButton() {
  return (
    <Link
      href="/criar-pedido"
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#b7131a] text-white shadow-2xl shadow-red-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      aria-label="Novo Pedido"
    >
      <span className="material-symbols-outlined text-3xl">add</span>
    </Link>
  );
}
