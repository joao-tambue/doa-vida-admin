interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "Políticas de Privacidade",      href: "#" },
  { label: "Termos Institucionais", href: "#" },
  { label: "Conformidade HIPAA",    href: "#" },
  { label: "Estado do Sistema",       href: "#" },
];

export default function LoginFooter() {
  return (
    <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 border-t border-gray-100">
      <div className="text-lg font-bold text-gray-900">Link Life</div>

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

      <div className="text-[11px] font-medium tracking-wide uppercase text-gray-400">
        © 2026 Link Life. Todos os direitos reservados.
      </div>
    </footer>
  );
}
