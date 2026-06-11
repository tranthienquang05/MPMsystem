import React, { useState } from "react";
import { Notice, Pitch, TeamMember } from "../types";

interface MangakaProps {
  pitches: Pitch[];
  notices: Notice[];
  team: TeamMember[];
  onOpenCanvas: (title: string, bgUrl?: string) => void;
  onMarkNoticeRead: (id: string) => void;
  onSubmitChapterDraft: (fileName: string) => void;
}

export default function MangakaDashboard({
  pitches,
  notices,
  team,
  onOpenCanvas,
  onMarkNoticeRead,
  onSubmitChapterDraft,
}: MangakaProps) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitFileName, setSubmitFileName] = useState("");
  const [submitChapterNum, setSubmitChapterNum] = useState("43");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  // Filter out editor notes specifically for Mangaka
  const editorNotes = notices.filter(n => n.type === "Editor Note");
  const unreadNotesCount = editorNotes.filter(n => !n.read).length;

  const handleNoteClick = (id: string) => {
    onMarkNoticeRead(id);
    setToastMessage("Editor notice marked as reviewed. Ink adjustments synchronized.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSubmitDraftForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitFileName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const finalArchive = `NeonGenesis_Ch${submitChapterNum}_${submitFileName}.zip`;
      onSubmitChapterDraft(finalArchive);
      
      setIsSubmitting(false);
      setShowSubmitModal(false);
      setSubmitFileName("");
      
      setToastMessage(`Draft archive ${finalArchive} dispatched to Editor Sato K. successfully!`);
      setTimeout(() => setToastMessage(""), 4000);
    }, 1500);
  };

  const primaryProject = {
    title: "Neon Genesis Underworld",
    chapter: 'Chapter 42: "The Fall of Sector 7"',
    phase: "Inking Phase",
    dueText: "Due in 3 days",
    completedPages: 14,
    totalPages: 20,
    backgroundUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXBY7HZHkp3IXfr7YSqgVmMh-AaxtFhZ0YsKw5qYGQoDYctyt8eN_qfksOdrBqoGl1RdCbi2YgcOYNXE1bGzCktbcsthmYO-IXN_qAW-AGOHGaY-5VhZMPjBstS5LirUE5EFGsCpZeSoQ2T-ex259gdsFWu2A9TsKFn8wDNa2t8c4ZJxTZopVuGr5cegyTl_5BF8SnfUR3G9qmwCyyB0BKOwLu4eXuwgX7aMQfiiNHGthKTvmW0sDrzWqIeEc8MNgSIaH0HDD18Hk",
  };

  return (
    <div className="space-y-6">
      
      {/* Toast panel */}
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-[#F5F2ED] text-[#121212] border border-[#121212] py-3.5 px-6 rounded-none text-xs font-bold shadow-2xl animate-bounce z-50 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm font-black text-[#121212]">done_all</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Welcome Banner */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-x-4 pb-6 border-b border-[#F5F2ED]/5">
        <div>
          <h2 className="font-serif text-4xl font-light tracking-wide text-[#F5F2ED] italic mb-2">
            Welcome back, Sensei
          </h2>
          <p className="text-xs text-[#F5F2ED]/60 font-sans mt-2">
            You have <span className="text-[#F5F2ED] font-bold uppercase tracking-wider">{3} chapters</span> in progress and <span className="text-red-400 font-bold uppercase tracking-wider">{unreadNotesCount} unread notes</span> from your editor.
          </p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0 shrink-0">
          <button
            onClick={() => alert("Dispatching workflow prompts to assistants Kenji and Sarah")}
            className="flex items-center justify-center bg-[#1c1c1c] text-[#F5F2ED]/85 border border-[#F5F2ED]/10 rounded-none py-2 px-4 text-[10px] uppercase font-bold tracking-widest font-sans hover:bg-[#F5F2ED]/5 transition-all cursor-pointer"
            id="manage-team-btn"
          >
            <span className="material-symbols-outlined text-base mr-2">group</span>
            <span>Manage Team</span>
          </button>
          
          <button
            onClick={() => onOpenCanvas(primaryProject.title, primaryProject.backgroundUrl)}
            className="flex items-center justify-center bg-[#F5F2ED] text-[#121212] rounded-none py-2 px-4 text-[10px] uppercase font-bold font-sans hover:bg-[#F5F2ED]/90 transition-all cursor-pointer"
            id="mangaka-draw-action"
          >
            <span className="material-symbols-outlined text-base mr-2">draw</span>
            <span>Open Drawing Board</span>
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
        
        {/* Left Side: Primary Project Card (Col 8) */}
        <div className="md:col-span-8 bg-[#181818] rounded-none border border-[#F5F2ED]/10 overflow-hidden hover:border-[#F5F2ED]/20 transition-all group relative flex flex-col min-h-[340px] shadow-lg">
          {/* Cover image backdrop exactly as in screenshot */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/85 to-transparent z-10"></div>
          
          <div 
            className="absolute inset-0 z-0 h-48 bg-cover bg-center opacity-30 grayscale contrast-125 mix-blend-screen" 
            style={{ backgroundImage: `url('${primaryProject.backgroundUrl}')` }}
          />
          
          <div className="relative z-20 p-6 flex flex-col h-full justify-between mt-12">
            
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2.5 mb-2 leading-none">
                  <span className="px-2 py-0.5 bg-black text-[#F5F2ED]/70 border border-[#F5F2ED]/10 rounded-none text-[9px] font-bold uppercase tracking-widest">
                    {primaryProject.phase}
                  </span>
                  <span className="text-[10px] text-[#F5F2ED]/40 font-bold uppercase tracking-widest font-mono flex items-center">
                    <span className="material-symbols-outlined text-sm mr-1">schedule</span>
                    {primaryProject.dueText}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl font-light italic text-[#F5F2ED] mb-1.5">
                  {primaryProject.title}
                </h3>
                <p className="text-xs text-[#F5F2ED]/60 font-sans font-light">
                  {primaryProject.chapter}
                </p>
              </div>
              
              <button 
                onClick={() => onOpenCanvas(primaryProject.title, primaryProject.backgroundUrl)}
                className="p-2 bg-[#121212]/60 rounded-none border border-[#F5F2ED]/10 text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:bg-black transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">fullscreen</span>
              </button>
            </div>

            {/* Bottom Pages completions block matched exactly layout */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-end justify-between bg-[#121212]/90 backdrop-blur-sm p-4 rounded-none border border-[#F5F2ED]/10 w-full font-sans">
              <div className="flex-1 w-full space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#F5F2ED]/50">
                  <span>Pages Completed</span>
                  <span className="text-[#F5F2ED] font-mono">{primaryProject.completedPages} / {primaryProject.totalPages}</span>
                </div>
                
                {/* Horizontal Progress bar */}
                <div className="w-full bg-[#121212] rounded-none h-1 overflow-hidden border border-[#F5F2ED]/10">
                  <div className="bg-[#F5F2ED] h-full rounded-none transition-all duration-700" style={{ width: "70%" }} />
                </div>
              </div>

              <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => onOpenCanvas(primaryProject.title, primaryProject.backgroundUrl)}
                  className="bg-transparent hover:bg-[#F5F2ED]/5 text-white rounded-none p-2.5 transition-all border border-[#F5F2ED]/10 flex items-center justify-center cursor-pointer"
                  title="Preview Reference Layers"
                >
                  <span className="material-symbols-outlined text-[#F5F2ED] text-base">visibility</span>
                </button>
                
                <button
                  onClick={() => onOpenCanvas(primaryProject.title, primaryProject.backgroundUrl)}
                  className="bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold tracking-widest font-bold rounded-none px-4 py-2 text-[10px] uppercase transition-colors cursor-pointer flex items-center"
                >
                  Continue Drawing
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Team status & Editor Notes (Col 4) */}
        <div className="md:col-span-4 flex flex-col gap-6 font-sans">
          
          {/* Team Status Card */}
          <div className="bg-[#181818] p-5 rounded-none border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/25 transition-colors flex-1 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] text-[#F5F2ED]/50 font-bold uppercase tracking-widest font-sans">Team Status</h4>
                <span className="material-symbols-outlined text-sm text-[#F5F2ED]/60">group_work</span>
              </div>
              
              <div className="space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#121212] border border-[#F5F2ED]/10 flex items-center justify-center text-[10px] font-bold text-white relative">
                        {member.avatar ? (
                          <img src={member.avatar} alt="member avatar" className="w-full h-full object-cover rounded-full grayscale" />
                        ) : (
                          member.initials
                        )}
                        <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-[#181818] ${member.statusColor}`}></div>
                      </div>
                      
                      <div className="ml-3">
                        <p className="text-xs font-bold text-[#F5F2ED] leading-none">{member.name}</p>
                        <p className="text-[9px] text-[#F5F2ED]/40 font-bold font-mono uppercase tracking-widest mt-1">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert("Task assignment dispatcher initialized. Synchronizing tones.")}
              className="w-full mt-5 py-2.5 border border-[#F5F2ED]/10 hover:bg-[#F5F2ED]/5 rounded-none text-[10px] font-bold text-[#F5F2ED] uppercase tracking-widest transition-colors cursor-pointer font-sans"
            >
              Assign Tasks
            </button>
          </div>

          {/* Correctives from publisher / Editor Notes */}
          <div className="bg-[#181818] p-5 rounded-none border border-[#F5F2ED]/10 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] text-[#F5F2ED]/50 font-bold uppercase tracking-widest">Editor Notes</h4>
              {unreadNotesCount > 0 && (
                <span className="bg-red-950/40 text-red-300 font-bold text-[9px] px-1.5 py-0.5 rounded-none border border-red-900/30 uppercase tracking-widest">
                  {unreadNotesCount} New
                </span>
              )}
            </div>

            <div className="space-y-3">
              {editorNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleNoteClick(note.id)}
                  className={`p-3 bg-[#121212]/50 hover:bg-[#F5F2ED]/5 rounded-none border-l-2 cursor-pointer transition-all ${
                    !note.read ? "border-red-400 bg-red-950/10" : "border-[#F5F2ED]/10"
                  }`}
                  title="Click to resolve note"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#F5F2ED] uppercase tracking-widest">Markup Correction</span>
                    {!note.read && (
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full block animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-[#F5F2ED]/70 leading-relaxed mt-1.5 font-light">
                    {note.content}
                  </p>
                  <p className="text-[9px] text-[#F5F2ED]/40 text-right italic mt-2 font-light">
                    Click to resolve & mark read
                  </p>
                </div>
              ))}

              {editorNotes.length === 0 && (
                <p className="text-xs text-[#F5F2ED]/40 italic text-center py-4">No markup corrections unread.</p>
              )}
            </div>
          </div>

        </div>

      </section>

      {/* Row 2: Secondary Project drafting (Col 6) & Submission Archive block (Col 6) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-sans">
        
        {/* Secondary project board */}
        <div className="bg-[#181818] p-6 rounded-none border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/20 transition-all flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-11 h-11 rounded-none bg-[#121212] flex items-center justify-center border border-[#F5F2ED]/10 text-[#F5F2ED]">
                <span className="material-symbols-outlined text-lg">brush</span>
              </div>
              
              <span className="px-2 py-0.5 bg-[#F5F2ED]/5 text-[#F5F2ED]/75 border border-[#F5F2ED]/10 rounded-none text-[9px] font-bold uppercase tracking-widest">
                Drafting
              </span>
            </div>
            
            <h3 className="font-serif text-2xl font-light italic text-[#F5F2ED] mb-1.5">Slice of Life Short</h3>
            <p className="text-xs text-[#F5F2ED]/60 font-sans leading-relaxed font-light">One-shot anthology for the upcoming Summer Special compilation.</p>
          </div>

          <div className="flex justify-between items-center pt-5 border-t border-[#F5F2ED]/5 mt-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F2ED]/40 font-mono">Pages Drafted: 4 / 30</span>
            <button 
              onClick={() => onOpenCanvas("Slice of Life Short", "https://lh3.googleusercontent.com/aida-public/AB6AXuB1O0bXDXaItFx1Tnd02eRxRWxdjsyzuO2vbstSgRn08g89jw1JBvRSWTziuUQLh8l11sdHu37QQtPg3G4M1xI8L67x_HlAGrDRry4Q6WFmF_WtAcJbYDwHAtPmD1-BXUbYidLYHvNkVbLlyayX-JNHruV4tRcuPtpoC0i9xTvgDkJLv11yAqGIUmucWA-A6sNZ3HoBeCkBZ8wv-Zeo-LLClbu7eeEzjq3BxOak-OqdviDi7tVNUAzP2hu5WTqp_xPrRkVSf45ZwkQ")}
              className="text-[#F5F2ED] hover:underline text-[10px] font-bold uppercase tracking-widest font-sans flex items-center gap-1 cursor-pointer"
            >
              <span>Edit Draft</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Submission log with upload facility */}
        <div className="bg-[#181818] p-6 rounded-none border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/20 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none translate-x-12 -translate-y-12">
            <span className="material-symbols-outlined text-[160px] text-[#F5F2ED]">publish</span>
          </div>

          <div>
            <h3 className="font-serif text-lg font-light italic text-[#F5F2ED] mb-1">Submissions Tracker</h3>
            <p className="text-xs text-[#F5F2ED]/40 font-light">Recent compiled files dispatched to the local publisher.</p>
            
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between p-3 bg-[#121212] border border-[#F5F2ED]/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-300 text-base fill">check_circle</span>
                  <div>
                    <p className="text-xs font-bold text-[#F5F2ED]">Chapter 41 Final.zip</p>
                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider font-mono mt-0.5">Approved by Editor Sato</p>
                  </div>
                </div>
                <span className="text-[9px] text-[#F5F2ED]/40 font-bold uppercase tracking-widest font-mono">Yesterday</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F5F2ED]/5 mt-5">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-[#121212] border border-[#F5F2ED]/15 border-dashed hover:bg-[#F5F2ED]/5 text-white hover:border-[#F5F2ED]/30 rounded-none font-sans text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              id="mangaka-submit-btn"
            >
              <span className="material-symbols-outlined text-[#F5F2ED] text-sm">publish</span>
              <span>Submit New Files for Review</span>
            </button>
          </div>
        </div>

      </section>

      {/* Dispatched Chapter Submit Archive Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#F5F2ED]/15 rounded-none w-full max-w-sm p-6 shadow-2xl font-sans" id="draft-submit-modal">
            <h3 className="font-serif italic font-light text-2xl text-[#F5F2ED] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED]">publish</span>
              Dispatch Master Draft
            </h3>
            <p className="text-[11px] text-[#F5F2ED]/55 mb-4">
              Bundle drawn layers and dispatch to Tantou review forum immediately for check tags.
            </p>

            <form onSubmit={handleSubmitDraftForm} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 space-y-1.5">
                  <label className="text-[10px] text-[#F5F2ED]/60 font-bold uppercase tracking-widest block">Chapter #:</label>
                  <input
                    type="number"
                    value={submitChapterNum}
                    onChange={(e) => setSubmitChapterNum(e.target.value)}
                    className="bg-[#121212] text-xs text-[#F5F2ED] border border-[#F5F2ED]/10 rounded-none p-2.5 focus:outline-none focus:border-[#F5F2ED]/25 w-full font-light"
                    required
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] text-[#F5F2ED]/60 font-bold uppercase tracking-widest block">Identifier Tag:</label>
                  <input
                    type="text"
                    value={submitFileName}
                    onChange={(e) => setSubmitFileName(e.target.value)}
                    placeholder="e.g., FinalDrawnPages..."
                    className="bg-[#121212] text-xs text-[#F5F2ED] border border-[#F5F2ED]/10 rounded-none p-2.5 focus:outline-none focus:border-[#F5F2ED]/25 w-full font-light"
                    required
                  />
                </div>
              </div>

              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 text-xs text-[#F5F2ED] py-3">
                  <div className="w-4 h-4 border-2 border-[#F5F2ED] border-t-transparent rounded-full animate-spin"></div>
                  Bundling vector lines and sending...
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED] hover:bg-[#F5F2ED]/5 font-bold py-1.5 px-4 rounded-none text-[11px] uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold py-1.5 px-4 rounded-none text-[11px] uppercase tracking-widest font-bold cursor-pointer"
                    id="confirm-submit-btn"
                  >
                    Submit Draft
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
