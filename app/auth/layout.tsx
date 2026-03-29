import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | DoaVida Health",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {children}
    </div>
  );
}
