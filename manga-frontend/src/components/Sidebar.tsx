import { useState, useEffect } from "react";
import { Role } from "../types";

interface SidebarProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
  onRequestCreateSeries: () => void;
}

export default function Sidebar({ currentRole, onSwitchRole, onRequestCreateSeries }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Define tabs with corresponding role mapping for prototype navigation helpers!
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      targetRole: Role.MANGAKA,
    },
    {
      id: "series",
      label: "Manga Series",
      icon: "auto_stories",
      targetRole: Role.MANGAKA,
    },
    {
      id: "production",
      label: "Production Tool",
      icon: "edit_note",
      targetRole: Role.ASSISTANT,
    },
    {
      id: "queue",
      label: "Editor Queue",
      icon: "rate_review",
      targetRole: Role.EDITOR_BOARD,
    },
    {
      id: "tantou",
      label: "Tantou Review",
      icon: "pending_actions",
      targetRole: Role.TANTOU_EDITOR,
    },
    {
      id: "team",
      label: "Team Board",
      icon: "groups",
      targetRole: Role.MANGAKA,
    },
    {
      id: "archives",
      label: "Archives",
      icon: "inventory_2",
      targetRole: Role.MANGAKA,
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (currentRole === Role.EDITOR_BOARD) return "queue";
    if (currentRole === Role.ASSISTANT) return "production";
    if (currentRole === Role.TANTOU_EDITOR) return "tantou";
    return "dashboard";
  });

  useEffect(() => {
    if (currentRole === Role.EDITOR_BOARD) setActiveTab("queue");
    else if (currentRole === Role.ASSISTANT) setActiveTab("production");
    else if (currentRole === Role.TANTOU_EDITOR) setActiveTab("tantou");
    else setActiveTab("dashboard");
  }, [currentRole]);

  // Filter navigation items based on current active role
  const filteredNavItems = navItems.filter((item) => item.targetRole === currentRole);

  const isTabActive = (item: typeof navItems[0]) => {
    return item.id === activeTab;
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-[#181818] h-screen fixed left-0 top-0 z-50 overflow-hidden border-r border-[#F5F2ED]/10 flex flex-col justify-between py-4 transition-all duration-350 ease-in-out ${
        isHovered ? "w-60 shadow-[8px_0_40px_rgba(0,0,0,0.6)]" : "w-16"
      }`}
      id="main-sidebar-rail"
    >
      {/* Upper Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Brand Header */}
        <div className="px-4 mb-8 flex items-center shrink-0">
          <div className="w-8 h-8 rounded-none bg-[#F5F2ED] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#121212] text-sm fill">auto_stories</span>
          </div>
          <div
            className={`ml-3 transition-opacity duration-300 whitespace-nowrap overflow-hidden ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h1 className="font-serif text-lg text-[#F5F2ED] tracking-widest uppercase leading-none">
              Sankyuu
            </h1>
            <p className="font-sans text-[8px] text-[#F5F2ED]/50 uppercase tracking-[0.25em] leading-none mt-1.5">
              Manga System
            </p>
          </div>
        </div>

        {/* CTA Button */}
        {currentRole === Role.MANGAKA && (
          <div className="px-2 mb-6 shrink-0">
            {isHovered ? (
              <button
                onClick={onRequestCreateSeries}
                className="w-full bg-[#121212] hover:bg-[#F5F2ED]/5 text-[#F5F2ED] border border-[#F5F2ED]/25 text-[11px] uppercase tracking-widest font-bold py-2.5 px-3 rounded-none flex items-center justify-center gap-2 transition-all active:scale-[0.98] outline-none cursor-pointer"
                id="sidebar-create-btn"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>New Series</span>
              </button>
            ) : (
              <button
                onClick={onRequestCreateSeries}
                className="w-10 h-10 bg-[#121212] hover:bg-[#F5F2ED]/5 text-[#F5F2ED] border border-[#F5F2ED]/20 rounded-none flex items-center justify-center mx-auto transition-all active:scale-90 cursor-pointer"
                id="sidebar-create-icon"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            )}
          </div>
        )}

        {/* Navigation items list */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 space-y-1">
          {filteredNavItems.map((item) => {
            const active = isTabActive(item);
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onSwitchRole(item.targetRole);
                }}
                className={`flex items-center w-full px-2.5 py-3 rounded-none text-left transition-all relative cursor-pointer ${
                  active
                    ? "text-[#F5F2ED] bg-[#F5F2ED]/5 font-bold border-r-2 border-[#F5F2ED]"
                    : "text-[#F5F2ED]/60 hover:bg-[#F5F2ED]/5 hover:text-[#F5F2ED]"
                }`}
                title={item.label}
              >
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${active ? "fill text-[#F5F2ED]" : "text-[#F5F2ED]/60"}`}>
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`ml-4 text-xs font-sans font-medium transition-opacity duration-300 whitespace-nowrap ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>

                {/* Subtle tool helper for testing */}
                {isHovered && item.id === "queue" && (
                  <span className="absolute right-2 text-[8px] border border-[#F5F2ED]/20 text-[#F5F2ED]/60 px-1.5 py-0.5 rounded-none uppercase tracking-widest font-mono">
                    Board
                  </span>
                )}
                {isHovered && item.id === "production" && (
                  <span className="absolute right-2 text-[8px] border border-[#F5F2ED]/20 text-[#F5F2ED]/60 px-1.5 py-0.5 rounded-none uppercase tracking-widest font-mono">
                    Assist
                  </span>
                )}
                {isHovered && item.id === "tantou" && (
                  <span className="absolute right-2 text-[8px] border border-[#F5F2ED]/20 text-[#F5F2ED]/60 px-1.5 py-0.5 rounded-none uppercase tracking-widest font-mono">
                    Edit
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Settings Area */}
      <div className="px-2 pt-4 border-t border-[#F5F2ED]/10 shrink-0 space-y-1">
        <button
          onClick={() => alert("Profile Settings & Security verification is managed via the top panel.")}
          className="flex items-center w-full px-2.5 py-2.5 rounded-none text-left text-[#F5F2ED]/60 hover:bg-[#F5F2ED]/5 hover:text-[#F5F2ED] transition-all cursor-pointer"
          title="Profile"
        >
          <div className="shrink-0 w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
          <span
            className={`ml-4 text-xs font-sans font-medium transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Profile
          </span>
        </button>

        <button
          onClick={() => alert("Settings configuration panel is active. For layout overrides explore the top theme selector.")}
          className="flex items-center w-full px-2.5 py-2.5 rounded-none text-left text-[#F5F2ED]/60 hover:bg-[#F5F2ED]/5 hover:text-[#F5F2ED] transition-all cursor-pointer"
          title="Settings"
        >
          <div className="shrink-0 w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <span
            className={`ml-4 text-xs font-sans font-medium transition-opacity duration-350 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
}
