interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "Privacy Policy",      href: "#" },
  { label: "Institutional Terms", href: "#" },
  { label: "HIPAA Compliance",    href: "#" },
  { label: "System Status",       href: "#" },
];

export default function RegisterFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="text-lg font-bold text-gray-900">DoaVida Health</div>

        <div className="flex flex-wrap justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium tracking-wide uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[11px] font-medium tracking-wide uppercase text-gray-400">
          © 2024 DoaVida Health Logistics. Secure Clinical Environment.
        </p>
      </div>
    </footer>
  );
}
