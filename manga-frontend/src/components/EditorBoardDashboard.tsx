import React, { useState } from "react";
import { Pitch, Notice } from "../types";

interface EditorBoardProps {
  pitches: Pitch[];
  notices: Notice[];
  onApprovePitch: (pitchId: string) => void;
  onRejectPitch: (pitchId: string) => void;
  onAddNotice: (content: string, type: Notice["type"]) => void;
}

export default function EditorBoardDashboard({
  pitches,
  notices,
  onApprovePitch,
  onRejectPitch,
  onAddNotice,
}: EditorBoardProps) {
  const [selectedQuarter, setSelectedQuarter] = useState("Q3 2024");
  const [showNoticeInput, setShowNoticeInput] = useState(false);
  const [newNoticeText, setNewNoticeText] = useState("");
  const [noticeType, setNoticeType] = useState<Notice["type"]>("Priority Revision");

  // Filter pitches that are pending pilot approval
  const pendingPitches = pitches.filter((p) => p.status === "pending" || p.status === "approved" || p.status === "rejected");
  const activePitch = pendingPitches[0] || pitches[0];

  const handleCreateNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;
    onAddNotice(newNoticeText, noticeType);
    setNewNoticeText("");
    setShowNoticeInput(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Title Banner */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-light tracking-wide text-[#F5F2ED] italic mb-2" id="board-header">
          Editor Queue
        </h1>
        <p className="text-xs text-[#F5F2ED]/60 font-sans max-w-2xl font-light">
          Review submissions, manage long-term serialization timelines, and deliberate pilot pitches.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Active Pitches (Col span 8) */}
        <div className="xl:col-span-8 bg-[#181818] rounded-none border border-[#F5F2ED]/10 overflow-hidden flex flex-col h-[580px] shadow-lg">
          {/* Section head */}
          <div className="p-5 border-b border-[#F5F2ED]/10 flex justify-between items-center bg-[#1c1c1c]/40">
            <h2 className="font-serif text-lg font-light italic text-[#F5F2ED] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED] fill">how_to_vote</span>
              Active Pitches
            </h2>
            <span className="px-3 py-1 bg-[#121212] text-[10px] tracking-widest text-[#F5F2ED] font-bold uppercase rounded-none font-sans border border-[#F5F2ED]/15">
              {pendingPitches.filter(p => p.status === "pending").length} Pending
            </span>
          </div>

          {/* Pitch Area */}
          {activePitch ? (
            <div className="flex-1 p-6 overflow-y-auto bg-[#121212]/30 relative transition-colors duration-300 flex flex-col justify-between">
              
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Visual Image */}
                <div className="w-full md:w-[40%] rounded-none overflow-hidden relative border border-[#F5F2ED]/10 aspect-[4/5] bg-[#121212] group/img shrink-0">
                  <img
                    alt="Manga Pitch Cover art"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 grayscale contrast-125"
                    src={activePitch.coverUrl}
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#121212]/90 rounded-none text-[9px] font-bold text-[#F5F2ED] border border-[#F5F2ED]/20 font-sans uppercase tracking-widest">
                    {activePitch.genre}
                  </div>
                  
                  {activePitch.status !== "pending" && (
                    <div className={`absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col justify-center items-center p-4`}>
                      <span className={`material-symbols-outlined text-4xl ${activePitch.status === 'approved' ? 'text-[#F5F2ED]' : 'text-red-400'}`}>
                        {activePitch.status === 'approved' ? 'check_circle' : 'cancel'}
                      </span>
                      <p className="font-serif italic font-light text-xl mt-3 tracking-wide capitalize text-[#F5F2ED]">
                        {activePitch.status === 'approved' ? 'Pitch Approved' : 'Pitch Deferred'}
                      </p>
                      <p className="text-[11px] text-[#F5F2ED]/60 font-sans mt-1 text-center font-light">
                        Consensus: {activePitch.boardConsensus}/4 points locked.
                      </p>
                    </div>
                  )}
                </div>

                {/* Details text panel */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-serif text-3xl font-light text-[#F5F2ED] italic mb-1.5 tracking-wide">
                    {activePitch.title}
                  </h3>
                  
                  <div className="font-sans text-[11px] tracking-wide text-[#F5F2ED]/50 mb-4 flex gap-1.5 uppercase">
                    <span>Mangaka:</span>
                    <span className="text-[#F5F2ED] hover:underline cursor-pointer font-medium">{activePitch.mangaka}</span>
                    <span className="text-[#F5F2ED]/25">|</span>
                    <span>Tantou:</span>
                    <span className="text-[#F5F2ED] font-medium">{activePitch.tantou}</span>
                  </div>

                  <p className="font-sans text-[#F5F2ED]/70 text-xs leading-relaxed mb-6 flex-1 font-light">
                    {activePitch.description}
                  </p>

                  {/* Consensus interactive block */}
                  <div className="bg-[#1c1c1c]/40 p-4 rounded-none border border-[#F5F2ED]/10 mt-auto font-sans">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-[#F5F2ED]/60 tracking-widest uppercase">Board Consensus</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              dot <= activePitch.boardConsensus
                                ? activePitch.status === "rejected" ? "bg-red-400 font-bold" : "bg-[#F5F2ED] glow-glow"
                                : "bg-[#F5F2ED]/15"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {activePitch.status === "pending" ? (
                      <div className="grid grid-cols-2 gap-3 shrink-0">
                        <button
                          onClick={() => onApprovePitch(activePitch.id)}
                          className="flex items-center justify-center gap-2 bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] py-2 px-4 rounded-none text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px] fill">thumb_up</span>
                          <span>Approve Series</span>
                        </button>
                        <button
                          onClick={() => onRejectPitch(activePitch.id)}
                          className="flex items-center justify-center gap-2 bg-transparent border border-[#F5F2ED]/20 text-[#F5F2ED]/80 hover:bg-red-950/20 hover:text-red-300 py-2 px-4 rounded-none text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">thumb_down</span>
                          <span>Decline</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-[10px] text-[#F5F2ED]/50 uppercase tracking-widest bg-[#121212]/50 p-2.5 rounded-none border border-[#F5F2ED]/10 font-bold">
                        Serialization unlocked • Cabinet verdict locked
                      </div>
                    )}
                  </div>

                </div>

              </div>
              
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center bg-[#121212]/50 p-12 text-center text-[#F5F2ED]/40 rounded-none border border-[#F5F2ED]/10">
              <span className="material-symbols-outlined text-4xl mb-3">inventory</span>
              <p className="font-semibold text-sm">No pitches remaining in Board review.</p>
            </div>
          )}

        </div>

        {/* Dynamic Secondary Column: Notice & Management Actions (Col span 4) */}
        <div className="xl:col-span-4 flex flex-col gap-6 h-[580px]">
          
          {/* Tantou Notices list */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 flex flex-col flex-1 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-[#F5F2ED]/10 bg-[#1c1c1c]/40 flex items-center justify-between">
              <h3 className="font-serif text-sm font-light italic text-[#F5F2ED] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F5F2ED] fill">campaign</span>
                Tantou Notices
              </h3>
              <button
                onClick={() => setShowNoticeInput(!showNoticeInput)}
                className="text-[10px] uppercase tracking-widest text-[#F5F2ED] font-bold hover:underline transition-all flex items-center gap-1 cursor-pointer"
                id="toggle-add-notice"
              >
                <span className="material-symbols-outlined text-[12px]">{showNoticeInput ? "close" : "edit"}</span>
                {showNoticeInput ? "Cancel" : "Post"}
              </button>
            </div>

            <div className="p-3 overflow-y-auto flex-1 space-y-2 font-sans">
              
              {showNoticeInput && (
                <form onSubmit={handleCreateNoticeSubmit} className="p-3 bg-[#121212] border border-[#F5F2ED]/15 rounded-none space-y-3 mb-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#F5F2ED]/60 font-bold uppercase tracking-wider">Type:</span>
                    <select
                      value={noticeType}
                      onChange={(e) => setNoticeType(e.target.value as Notice["type"])}
                      className="bg-[#121212] text-[10px] text-[#F5F2ED] border border-[#F5F2ED]/20 rounded-none px-2 py-0.5 uppercase font-bold tracking-wider"
                    >
                      <option value="Priority Revision">Priority Revision</option>
                      <option value="Update">Update</option>
                    </select>
                  </div>
                  <textarea
                    value={newNoticeText}
                    onChange={(e) => setNewNoticeText(e.target.value)}
                    placeholder="Enter immediate notice content as Publisher Board..."
                    className="w-full bg-[#121212]/50 border border-[#F5F2ED]/10 rounded-none p-2 text-xs text-[#F5F2ED] focus:outline-none focus:border-[#F5F2ED]/25 resize-none h-14 font-light"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#F5F2ED] hover:bg-[#F5F2ED]/95 text-[#121212] font-semibold py-1.5 px-3 rounded-none text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                  >
                    Broadcast Alert
                  </button>
                </form>
              )}

              {notices.filter(n => n.type === "Priority Revision" || n.type === "Update").map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 bg-[#121212]/60 hover:bg-[#F5F2ED]/5 rounded-none border border-[#F5F2ED]/10 cursor-default transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start mb-1 leading-none">
                    <span className="font-mono text-[9px] font-bold text-[#F5F2ED] uppercase tracking-widest">
                      {notice.type}
                    </span>
                    <span className="text-[9px] text-[#F5F2ED]/40 font-medium">
                      {notice.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F2ED]/80 leading-relaxed font-light mt-1.5">
                    {notice.content}
                  </p>
                  <span className="text-[9px] text-[#F5F2ED]/40 block mt-2 text-right italic font-serif">
                    By {notice.sender || "Cabinet"}
                  </span>
                </div>
              ))}

              {notices.length === 0 && (
                <p className="text-xs text-[#F5F2ED]/40 italic text-center py-6 font-light">No notices broadcasted today.</p>
              )}

            </div>
          </div>

          {/* Quick Management commands */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 flex flex-col p-4 shadow-lg font-sans">
            <h3 className="font-serif text-sm font-light italic text-[#F5F2ED] flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#F5F2ED]/50">calendar_month</span>
              Serialization Management
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => alert("Release Calendar scheduled. Synchronizing metadata with print factories.")}
                className="w-full flex items-center justify-between text-left text-xs bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED]/80 p-3 rounded-none hover:bg-[#F5F2ED]/5 transition-colors group cursor-pointer"
                id="management-dates-btn"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#F5F2ED]">event_available</span>
                  <span className="font-sans text-xs font-light">Set Release Dates</span>
                </div>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => alert("Halt signal broadcast locked. Choose series metadata first.")}
                className="w-full flex items-center justify-between text-left text-xs bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED]/80 p-3 rounded-none hover:bg-[#F5F2ED]/5 transition-colors group cursor-pointer"
                id="management-halt-btn"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-red-500">cancel</span>
                  <span className="font-sans text-xs font-light">Cancel / Pause Series</span>
                </div>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Timeline Section (Full width 12 cols below) */}
      <div className="mt-6 bg-[#1A1A1A] rounded-xl border border-[#333] overflow-hidden shadow-lg">
        {/* head */}
        <div className="p-5 border-b border-[#333] bg-[#1c1b1b] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">linear_scale</span>
            Serialization Timeline
          </h2>
          
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="bg-[#0e0e0e] border border-[#333] rounded px-3 py-1 text-xs text-white outline-none focus:border-primary shrink-0 transition-all cursor-pointer font-sans"
            id="timeline-quarter-select"
          >
            <option value="Q3 2024">Q3 2024 (Current)</option>
            <option value="Q4 2024">Q4 2024 (Winter Slot)</option>
            <option value="Q1 2025">Q1 2025 (Spring Slot)</option>
          </select>
        </div>

        {/* Timeline Chart wrapper */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[800px] font-sans">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 mb-4 border-b border-[#333] pb-2 text-[11px] font-bold text-[#8b90a0] uppercase tracking-wider">
              <div className="col-span-3">Project</div>
              <div className="col-span-3 text-center">Month 1</div>
              <div className="col-span-3 text-center">Month 2</div>
              <div className="col-span-3 text-center font-bold">Month 3</div>
            </div>

            {/* Conditional display depending on mock selected Quarter */}
            {selectedQuarter === "Q3 2024" ? (
              <div className="space-y-4">
                {/* Cyberpunk Samurai */}
                <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-[#202020] rounded px-3 -mx-3 transition-colors duration-200">
                  <div className="col-span-3">
                    <div className="text-xs font-bold text-white">Cyberpunk Samurai</div>
                    <div className="text-[10px] text-on-surface-variant font-medium mt-0.5">Vol 4 Serialization</div>
                  </div>
                  <div className="col-span-9 relative h-6 bg-[#000] rounded overflow-hidden border border-[#333] flex">
                    <div className="w-1/3 bg-primary/10 border-r border-primary/30 flex items-center justify-center">
                      <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Final Inking</span>
                    </div>
                    <div className="w-1/3 bg-tertiary/10 border-r border-tertiary/30 flex items-center justify-center">
                      <span className="text-[9px] text-tertiary font-bold uppercase tracking-wider">Typesetting</span>
                    </div>
                    <div className="w-1/3 bg-[#111111] flex items-center justify-center">
                      <span className="text-[9px] text-[#8b90a0] font-bold uppercase tracking-wider">Bulk Print</span>
                    </div>
                  </div>
                </div>

                {/* Mystic Academy */}
                <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-[#202020] rounded px-3 -mx-3 transition-colors duration-200">
                  <div className="col-span-3">
                    <div className="text-xs font-bold text-white">Mystic Academy</div>
                    <div className="text-[10px] text-on-surface-variant font-medium mt-0.5">New Serialization</div>
                  </div>
                  <div className="col-span-9 relative h-6 bg-[#000] rounded overflow-hidden border border-[#333] flex">
                    <div className="w-1/4" />
                    <div className="w-2/4 bg-primary/10 border-x border-primary/30 flex items-center justify-center">
                      <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Marketing Launch</span>
                    </div>
                    <div className="w-1/4" />
                  </div>
                </div>
              </div>
            ) : selectedQuarter === "Q4 2024" ? (
              <div className="space-y-4">
                {/* Neon Genesis */}
                <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-[#202020] rounded px-3 -mx-3 transition-colors duration-200">
                  <div className="col-span-3">
                    <div className="text-xs font-bold text-white">Neon Genesis Resonance</div>
                    <div className="text-[10px] text-on-surface-variant font-medium mt-0.5">Weekly Launch Issue</div>
                  </div>
                  <div className="col-span-9 relative h-6 bg-[#000] rounded overflow-hidden border border-[#333] flex">
                    <div className="w-2/3 bg-[#0a2342] border-r border-[#007BFF]/30 flex items-center justify-center">
                      <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Draft approvals (Chapters 1-5)</span>
                    </div>
                    <div className="w-1/3 bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Direct Serialization</span>
                    </div>
                  </div>
                </div>

                <div className="text-center py-6 text-xs text-on-surface-variant italic">
                  Additional timelines being mapped under Winter Slot consensus.
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-on-surface-variant italic">
                No active serialization scheduled yet for Q1 2025 Spring slots.
              </div>
            )}

            <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed">
              * Note: Timelines sync immediately with Tokyo and Kyoto editorial divisions. Drag items or modify quarters dynamically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
