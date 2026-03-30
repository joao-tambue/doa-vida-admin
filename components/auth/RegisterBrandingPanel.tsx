import Image from "next/image";

export default function RegisterBrandingPanel() {
  return (
    <div className="hidden md:flex md:w-1/3 bg-[#b7131a] p-10 flex-col justify-between relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbhkxWWbkNuJgEcapyeNFWRjl_N8OCRH-LiNRAUlNNwDK5-MUIScICLptVqjMzCXTfcQFkixGh4QOW1QRI7fw_6fNQPRjqJKGlloG5jyACdKYkHBrnEQuf57uFU57ky-LPA8a0VhJLuKpVjz-m8FHk55E-GARYg5jriBvCXXZpWtTzYY7K1mFGLjsjXiYyGraGq2uUL84lv36Poe1jBGI4LoGBzhmwQQZXSdY016BO_B-GJ2oDgySb8cqWLEnsGeebxA8-DGXeAkeA"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Top text */}
      <div className="relative z-10">
        <h2 className="text-white text-3xl font-extrabold tracking-tight leading-tight">
          Bem-vindo à Maternidade Augusto Ngangula.
        </h2>
        <p className="text-white/80 mt-4 text-sm font-medium">
          Junte-se à rede clínica oficial no ecossistema digital DoaVida.
        </p>
      </div>

      {/* Bottom badge */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="material-symbols-outlined text-white text-lg">
          verified_user
        </span>
        <span className="text-white/90 text-[10px] uppercase tracking-widest font-bold">
          Protocolo Seguro
        </span>
      </div>
    </div>
  );
}
