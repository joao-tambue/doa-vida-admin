import RegisterBrandingPanel from "@/components/auth/RegisterBrandingPanel";
import RegisterFooter from "@/components/auth/RegisterFooter";
import RegisterForm from "@/components/auth/RegisterForm";
import RegisterNavbar from "@/components/auth/RegisterNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registar Instituição | DoaVida Health",
};

export default function RegistoPage() {
  return (
    <>
      <RegisterNavbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 md:px-0">
        <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_40px_rgba(33,33,33,0.06)]">
          {/* <RegisterBrandingPanel /> */}
          <RegisterForm />
        </div>
      </main>

      <RegisterFooter />
    </>
  );
}
