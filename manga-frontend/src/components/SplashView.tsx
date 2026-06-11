import React, { useState } from "react";
import { Role } from "../types";

interface SplashViewProps {
  onLogin: (role: Role) => void;
}

export default function SplashView({ onLogin }: SplashViewProps) {
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const PASSWORD_MAP: Record<Role, string> = {
    [Role.MANGAKA]: "sensei",
    [Role.ASSISTANT]: "assistant",
    [Role.TANTOU_EDITOR]: "tantou",
    [Role.EDITOR_BOARD]: "board",
    [Role.SPLASH]: "",
  };

  const NAME_MAP: Record<Role, string> = {
    [Role.MANGAKA]: "Kato Akira (Sensei)",
    [Role.ASSISTANT]: "Kenji & Sarah (Inkers)",
    [Role.TANTOU_EDITOR]: "M. Sato (Tantou)",
    [Role.EDITOR_BOARD]: "Publisher Board Director",
    [Role.SPLASH]: "",
  };

  // Available roles styled beautifully for Editorial Aesthetic
  const roles = [
    {
      role: Role.MANGAKA,
      tag: "Sensei",
      title: "Mangaka Workspace",
      description: "Direct drawing board, submit master chapters, view editor's markup corrections, and direct team assistants.",
      icon: "brush",
    },
    {
      role: Role.ASSISTANT,
      tag: "Inker",
      title: "Studio Assistant Desk",
      description: "Apply background layers, fine-tune speedlines, download reference assets, and clear pending task boards.",
      icon: "draw",
    },
    {
      role: Role.TANTOU_EDITOR,
      tag: "Tantou",
      title: "Chapter Editor Reviews",
      description: "Perform panel-by-panel approvals, leave precise sticky revisions for the Mangaka, and manage progress.",
      icon: "rate_review",
    },
    {
      role: Role.EDITOR_BOARD,
      tag: "Publisher",
      title: "Publisher Board Seat",
      description: "Convene Pilot Consensus forums, execute long-term serialization timelines, and approve new series pitches.",
      icon: "groups",
    }
  ];

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setPassword("");
    setErrorMsg("");
  };

  const handleAutoFill = () => {
    if (selectedRole) {
      setPassword(PASSWORD_MAP[selectedRole]);
      setErrorMsg("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setErrorMsg("Please select an identity first.");
      return;
    }

    const correctPassword = PASSWORD_MAP[selectedRole];
    if (password === correctPassword) {
      onLogin(selectedRole);
    } else {
      setErrorMsg(`Identity verification failed. Secret key for this node is '${correctPassword}'.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F2ED] font-sans flex items-center justify-center m-0 p-4 overflow-hidden relative select-none">
      
      {/* Editorial Gridlines Backdrop */}
      <div className="absolute inset-x-0 top-0 bottom-0 grid grid-cols-6 pointer-events-none opacity-[0.04]">
        <div className="border-r border-[#F5F2ED] h-full" />
        <div className="border-r border-[#F5F2ED] h-full" />
        <div className="border-r border-[#F5F2ED] h-full" />
        <div className="border-r border-[#F5F2ED] h-full" />
        <div className="border-r border-[#F5F2ED] h-full" />
        <div className="h-full" />
      </div>

      {/* Exquisite Horizontal Line and Callouts */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between border-b border-[#F5F2ED]/10 pb-4 pointer-events-none md:flex hidden">
        <span className="font-serif italic text-sm tracking-widest text-[#F5F2ED]/60">&mdash; Production Workspace</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F5F2ED]/40 font-bold">Tokyo Studio System v2.6 // Secure Access</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-t border-[#F5F2ED]/10 pt-4 pointer-events-none md:flex hidden">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F5F2ED]/40 font-bold">ALL SYSTEM LOGS CRYPTOGRAPHIC</span>
        <span className="font-serif italic text-xs text-[#F5F2ED]/60">Sankyuu Co. Ltd &copy; 2026</span>
      </div>

      {/* Main Card container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-8 sm:p-10 text-center bg-[#181818] border border-[#F5F2ED]/10 rounded-none shadow-[20px_20px_0px_rgba(245,242,237,0.03)] transition-all duration-500">
        
        {!showRoleSelector ? (
          <div className="w-full flex flex-col items-center">
            {/* Decorative Kanji Accent */}
            <div className="text-[10px] tracking-[0.5em] text-[#F5F2ED]/40 font-serif uppercase mb-2">
              サンキュー • 創刊
            </div>

            {/* Brand Centerpiece */}
            <div className="mb-14">
              <h1 
                className="font-serif text-7xl font-light text-[#F5F2ED] tracking-wide italic transform hover:-translate-y-1 transition-transform duration-500 cursor-default"
                id="splash-logo-title"
              >
                Sankyuu
              </h1>
              <div className="w-16 h-[1px] bg-[#F5F2ED]/30 mx-auto my-4" />
              <p className="font-sans text-xs text-[#F5F2ED]/60 font-semibold uppercase tracking-[0.3em]">
                Manga Editorial System
              </p>
            </div>

            {/* Login Button Area */}
            <div className="w-full max-w-sm">
              <button 
                onClick={() => setShowRoleSelector(true)}
                className="w-full bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold py-4 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                id="splash-login-btn"
              >
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">login</span>
                <span className="font-sans text-xs uppercase tracking-widest font-bold">Enter the Studio</span>
              </button>
              
              <p className="text-[#F5F2ED]/40 mt-10 text-[10px] uppercase tracking-[0.2em] font-semibold">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full text-left" id="role-selector-container">
            {/* Back to main */}
            <button 
              onClick={() => {
                setShowRoleSelector(false);
                setSelectedRole(null);
                setPassword("");
                setErrorMsg("");
              }}
              className="text-xs text-[#F5F2ED]/60 hover:text-[#F5F2ED] flex items-center gap-2 mb-6 transition-colors font-sans uppercase tracking-widest cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Cover
            </button>

            <h2 className="font-serif text-3xl font-light text-[#F5F2ED] mb-1 tracking-wide italic">
              Signature Identity
            </h2>
            <p className="text-xs text-[#F5F2ED]/50 mb-4 leading-relaxed font-sans font-light">
              Authenticate via your assigned node to securely query schedules, layers, and reviews.
            </p>

            {/* List of roles */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 border-b border-[#F5F2ED]/5 pb-4 mb-4" id="role-login-options">
              {roles.map((item) => {
                const isSelected = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleSelectRole(item.role)}
                    className={`w-full text-left p-3.5 rounded-none border transition-all duration-300 flex items-start gap-4 group relative cursor-pointer ${
                      isSelected 
                        ? "border-[#F5F2ED] bg-[#F5F2ED]/10 text-white shadow-md" 
                        : "border-[#F5F2ED]/10 bg-[#121212]/50 hover:bg-[#F5F2ED]/5 hover:border-[#F5F2ED]/30"
                    }`}
                  >
                    <div className={`p-1.5 rounded-none border flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#F5F2ED] text-[#121212]" : "bg-[#F5F2ED]/5 border-[#F5F2ED]/10 text-[#F5F2ED]"
                    }`}>
                      <span className="material-symbols-outlined text-base">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic font-medium text-sm transition-colors group-hover:text-white">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] border border-[#F5F2ED]/25 text-[#F5F2ED]/60 px-2 py-0.2 rounded-none uppercase tracking-wide">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#F5F2ED]/50 mt-1 leading-normal font-light">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Password input section */}
            {selectedRole && (
              <form onSubmit={handleFormSubmit} className="space-y-4 animate-fadeIn" id="login-fields-form">
                <div className="bg-[#121212] border border-[#F5F2ED]/10 p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#F5F2ED]/60 font-mono font-bold block">
                      Target Identity
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 font-bold px-2 py-0.5 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                    >
                      Auto-Fill Key
                    </button>
                  </div>
                  
                  <div className="text-sm font-bold text-[#F5F2ED] font-serif italic mb-3">
                    {NAME_MAP[selectedRole]}
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] uppercase tracking-widest text-[#F5F2ED]/40 font-bold block">
                      Security Verification Passkey
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMsg("");
                        }}
                        placeholder={`Enter key (Hint: '${PASSWORD_MAP[selectedRole]}')`}
                        className="bg-[#181818] text-xs text-[#F5F2ED] border border-[#F5F2ED]/10 rounded-none w-full py-2 pl-3 pr-10 focus:outline-none focus:border-[#F5F2ED]/20 font-light"
                        required
                        id="login-password-field"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F2ED]/50 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm select-none">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 font-mono italic leading-relaxed animate-pulse">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] py-3 text-xs uppercase tracking-widest font-bold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  id="submit-auth-btn"
                >
                  <span className="material-symbols-outlined text-sm">vpn_key</span>
                  <span>Verify Signature & Enter</span>
                </button>
              </form>
            )}

            {!selectedRole && (
              <div className="bg-[#121212]/30 border border-dashed border-[#F5F2ED]/10 p-5 text-center text-xs text-[#F5F2ED]/40 font-light">
                Please select your assigned studio role above to configure secure access tokens.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
