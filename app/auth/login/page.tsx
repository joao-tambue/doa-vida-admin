import LoginBrandingPanel from "@/components/auth/LoginBrandingPanel";
import LoginFooter from "@/components/auth/LoginFooter";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | DoaVida Health",
};

export default function LoginPage() {
  return (
    <>
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <LoginBrandingPanel />
          <LoginForm />
        </div>
      </main>
      <LoginFooter />
    </>
  );
}
