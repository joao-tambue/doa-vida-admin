interface LegalCard {
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
}

const LEGAL_CARDS: LegalCard[] = [
  {
    icon: "gavel",
    title: "Termos e Condições",
    description:
      "Ao utilizar a plataforma DoaVida, concorda em cumprir as nossas diretrizes institucionais de tratamento de dados e protocolos clínicos.",
    linkLabel: "Ler termos completos",
    href: "#",
  },
  {
    icon: "privacy_tip",
    title: "Política de Privacidade",
    description:
      "Os seus dados e registos de inventário hospitalar estão protegidos por encriptação ponta-a-ponta e leis regionais de privacidade de informação de saúde.",
    linkLabel: "Painel de privacidade",
    href: "#",
  },
];

export default function SettingsFooter() {
  return (
    <>
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {LEGAL_CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-start gap-5"
          >
            <div className="bg-white p-3 rounded-lg text-gray-400 shadow-sm shrink-0">
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{card.title}</h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                {card.description}
              </p>
              <a
                href={card.href}
                className="text-xs font-bold text-[#b7131a] flex items-center gap-1 hover:gap-2 transition-all"
              >
                {card.linkLabel}
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="col-span-12 mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 pb-12">
        <p className="text-xs text-gray-400">
          © 2024 DoaVida Health. Todos os dados clínicos são encriptados com o
          padrão AES-256.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs font-bold text-gray-400 hover:text-[#b7131a] uppercase tracking-tighter transition-colors"
          >
            Estado do Sistema: Operacional
          </a>
          <a
            href="#"
            className="text-xs font-bold text-gray-400 hover:text-[#b7131a] uppercase tracking-tighter transition-colors"
          >
            Documentação API
          </a>
        </div>
      </footer>
    </>
  );
}
