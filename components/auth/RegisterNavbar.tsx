import Image from "next/image";
import Link from "next/link";

export default function RegisterNavbar() {
  return (
    <header className="bg-white w-full top-0 z-50 border-b border-gray-100">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link
          href="/auth/login"
          className="text-2xl font-black tracking-tighter text-red-700"
        >
          DoaVida Health
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <span className="text-gray-400 font-medium hover:text-red-600 transition-colors cursor-pointer">
            Support
          </span>
          <span className="text-gray-400 font-medium hover:text-red-600 transition-colors cursor-pointer">
            Security Protocol
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFf8_U1dav6UesUfCfJEbvY-lNZQ-l6NromIg920Pgpn5UKRgMoZO3GHPeYecO-v2dNwEEqaoThKtD3ufZMGQBcfpsqn4S0o17S_Vq2MBMSHx3ZdtvvHBAwlxQDDebXE86QuzgULpCJDAT0C3lTuIoOwax1AWalACBGtUcBf3tPuwGgep3HUivv5k-Qjph3XAi6911bQpdlksEkF7q1l20QZYeud7urU8-6n40rnrrUspGdelyZJFyFFB5H7yv0-DtkiwBg8ywshI_"
              alt="Medical Institution Badge"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
