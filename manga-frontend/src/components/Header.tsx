import { Role } from "../types";

interface HeaderProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
  title: string;
}

export default function Header({ currentRole, onSwitchRole, title }: HeaderProps) {
  // Avatars for different roles
  const avatarMap: Record<Role, string> = {
    [Role.SPLASH]: "",
    [Role.EDITOR_BOARD]: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPfvf0aEahT3_MJJimuQcORbKJN2smV24BD3X5hCIDgUJZ84QTVS0nIrYNQotW9ywNpf2DGEh3PC-g6S0dbp0XP4uTdU2OMr6bkVKjnoiuluNaS0o3o-nth_ngaSjCww3QNBaBAGAQYiCHsWhNRfiAc968hfhfO4LBGYJk8xtV9r3Mg9pE9fW5mG_7_Hon8v97LKkO76fsIW_rcqq3hSue4zFy2NMZb4k00VHb7J1IEI1ZFrjg9GPM5pud62b0KHo1-OQliyxrFRo",
    [Role.ASSISTANT]: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu3UI98fI06mgr6_pLQ61Gf2nt97o9conqjuz6pbR4IwPymoG9FIW2Ph9joEBb6_Fd1tHYGTEXzaL7c0nD78q7U1gSvMpwSoEhpp1Q_GZ9xvV3H0jfQpW1Ab4r8livcEZBgXgOfqoq_YztCcE6a1dQFntFcwCLb0nP4sPmwHnin4flRdygmHZOeYIfp2vVjhfOh4Fsxe0Rk51xhXhi1nIWvtdCdrgrIizZ8d8Cf0rwF06KZC0METt0Bcu_fmO6UQVrSOulcnJahY",
    [Role.TANTOU_EDITOR]: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ5-x1PBggpPr4lsvg6Y4LF8csvYyiGya5Xi6rmzc3A-hEM4Fu5U99Lb04qGd6c-ig4LJXSomdphUKhW-VIcik7QEPnQHX7k6LCYj7f8ke5OyxAvmSxYBfIwk3wSm7ZI0PrmXySARCFi3gQZiiWWaVpi-0ytcYzHpFO4dYMBFzvsuYk7-N63o7qxd0N9GVHqUnE3oB3U24-Oj9C2-fxHUfVsY4-nEWY2l26NUBPmhkiCJ9U7gksaQCpX2nz4Qo2vzidzXpBd6qVQw",
    [Role.MANGAKA]: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxM01Tkg4sdaCGFuyH-ps9eg4MN1koNCzFslMR7N-dHjzGKiRZdG-mC44IftPcVCwoSGLyqd2hh2PxhahwHuDN-ssZt_-VXEFKWbhNdCSOfeD4VUXjxehLq3zO_aa7ypHXk6mpN_9brSQzPscDWqY1-2a41R2hPaB4PMeM2v80uXci0HrCxN8_jJMf6hjSUh1mHUEkmWL2SI9Oi24eds8L-bXdIaH0i0BClla-Dw_pqxWQ8smKENKm4eaAlkCKWa97U8A6hg2n_z8"
  };

  // Search input placeholders for different screens
  const placeholders: Record<Role, string> = {
    [Role.SPLASH]: "",
    [Role.EDITOR_BOARD]: "Search projects...",
    [Role.ASSISTANT]: "Search tasks or files...",
    [Role.TANTOU_EDITOR]: "Search series, notes...",
    [Role.MANGAKA]: "Search projects, chapters..."
  };

  return (
    <header className="bg-[#181818]/80 backdrop-blur-md flex justify-between items-center w-full h-16 px-6 sticky top-0 z-40 border-b border-[#F5F2ED]/10">
      
      {/* Title / Role Tag */}
      <div className="flex items-center gap-4">
        <h1 className="hidden md:block font-serif text-xl font-light text-[#F5F2ED] tracking-wide italic">
          Sankyuu
        </h1>
        
        {/* Dynamic Badge indicating current workspace mode */}
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-[#F5F2ED]/5 text-[#F5F2ED] px-2.5 py-1 border border-[#F5F2ED]/15">
          {title}
        </span>
      </div>

      {/* Secure Cryptographic Workspace Token Signature Indicator */}
      <div className="hidden lg:flex items-center gap-2 bg-[#121212] py-2 px-3.5 border border-[#F5F2ED]/10 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED]/50" id="header-verification-indicator">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        <span>Cryptographic Token Verified</span>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-6">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F2ED]/50 text-sm">
            search
          </span>
          <input
            className="bg-[#121212] border border-[#F5F2ED]/10 rounded-none pl-9 pr-4 py-1.5 text-xs font-sans focus:outline-none focus:border-[#F5F2ED]/30 transition-colors text-[#F5F2ED] placeholder-[#F5F2ED]/30 w-60"
            placeholder={placeholders[currentRole]}
            type="text"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button className="text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors p-1.5 rounded relative text-lg flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F5F2ED] rounded-full"></span>
          </button>
          
          <button className="text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors p-1.5 rounded text-lg flex items-center justify-center">
            <span className="material-symbols-outlined">history_edu</span>
          </button>
          
          <button 
            type="button"
            onClick={() => onSwitchRole(Role.SPLASH)}
            className="text-[#F5F2ED]/60 hover:text-[#F5F2ED] transition-colors p-1.5 rounded text-lg flex items-center justify-center cursor-pointer"
            title="Log Out of Workspace"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>

          {/* User profile with dropdown look */}
          <div className="w-8 h-8 rounded-none overflow-hidden border border-[#F5F2ED]/10 aspect-square relative select-none">
            <img
              alt="User Active Avatar"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
              src={avatarMap[currentRole]}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
