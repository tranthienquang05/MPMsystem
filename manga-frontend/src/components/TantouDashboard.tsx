import React, { useState } from "react";
import { Pitch, Notice } from "../types";

interface TantouProps {
  pitches: Pitch[];
  notices: Notice[];
  onOpenCanvas: (title: string, bgUrl?: string) => void;
  onApproveAndSendToBoard: (itemTitle: string) => void;
  onAddFeedbackToMangaka: (feedbackContent: string) => void;
}

export default function TantouDashboard({
  pitches,
  notices,
  onOpenCanvas,
  onApproveAndSendToBoard,
  onAddFeedbackToMangaka,
}: TantouProps) {
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const activeReviewItem = {
    title: "Neon Genesis - Chapter 42",
    mangaka: "Sato K.",
    phase: "Inking Phase",
    pages: "32 Pages",
    subTag: "Action Sequence",
    submittedTime: "Submitted 2h ago",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1O0bXDXaItFx1Tnd02eRxRWxdjsyzuO2vbstSgRn08g89jw1JBvRSWTziuUQLh8l11sdHu37QQtPg3G4M1xI8L67x_HlAGrDRry4Q6WFmF_WtAcJbYDwHAtPmD1-BXUbYidLYHvNkVbLlyayX-JNHruV4tRcuPtpoC0i9xTvgDkJLv11yAqGIUmucWA-A6sNZ3HoBeCkBZ8wv-Zeo-LLClbu7eeEzjq3BxOak-OqdviDi7tVNUAzP2hu5WTqp_xPrRkVSf45ZwkQ",
  };

  const handleApproveAction = () => {
    onApproveAndSendToBoard(activeReviewItem.title);
    setToastMessage("Chapter draft approved and successfully dispatched to the Publisher Board forum!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    onAddFeedbackToMangaka(feedbackText);
    setFeedbackText("");
    setShowFeedbackInput(false);
    setToastMessage("Correction note appended to Sensei's drawing board live!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast alert indicator */}
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-[#F5F2ED] text-[#121212] border border-[#121212] py-3.5 px-6 rounded-none text-xs font-bold shadow-2xl animate-bounce z-50 flex items-center gap-2">
          <span className="material-symbols-outlined font-black text-sm">notifications_active</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Head section with titles & quick action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[9px] font-bold text-[#F5F2ED]/40 mb-1 uppercase tracking-[0.2em]">Tantou Editor Dashboard</p>
          <h2 className="font-serif text-4xl font-light tracking-wide text-[#F5F2ED] italic mb-2">Review Queue</h2>
          <p className="text-xs text-[#F5F2ED]/60 font-sans font-light">Compare inking layers, compile feedback, and push approved pages to Pilot boards.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => alert("Current filter: Active Queue. No inactive chapters submitted today.")}
            className="px-4 py-2 border border-[#F5F2ED]/10 text-[#F5F2ED]/70 hover:bg-[#F5F2ED]/5 rounded-none text-[10px] uppercase tracking-widest font-bold font-sans transition-all cursor-pointer"
            id="filter-status-btn"
          >
            Filter Status
          </button>
          
          <button 
            onClick={handleApproveAction}
            className="px-4 py-2 bg-[#F5F2ED] text-[#121212] hover:bg-[#F5F2ED]/90 rounded-none text-[10px] uppercase tracking-widest font-bold font-sans flex items-center gap-2 transition-all cursor-pointer"
            id="approve-send-board-btn"
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
            <span>Approve & Send to Board</span>
          </button>
        </div>
      </div>

      {/* Grid Layout (Col 8 Left, Col 4 Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
        
        {/* Left main: Active Reviews (Col 8) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Main big draft review block */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 overflow-hidden hover:bg-[#1c1c1c]/40 transition-all shadow-lg">
            <div className="p-6">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">High Priority Review</span>
                </div>
                <span className="text-[10px] text-[#F5F2ED]/40 font-bold uppercase tracking-widest font-mono">
                  {activeReviewItem.submittedTime}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                
                {/* Visual sketch layout cover box */}
                <div className="w-32 h-40 bg-[#121212] rounded-none shrink-0 relative overflow-hidden border border-[#F5F2ED]/10 cursor-pointer group" onClick={() => onOpenCanvas(activeReviewItem.title, activeReviewItem.coverUrl)}>
                  <img
                    alt="Active Chapter submission Draft Layout Preview"
                    className="w-full h-full object-cover opacity-70 grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                    src={activeReviewItem.coverUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-light italic text-[#F5F2ED] mb-1.5 tracking-wide">
                      {activeReviewItem.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#F5F2ED]/50 mb-4 font-bold">
                      Mangaka: <span className="text-[#F5F2ED] hover:underline cursor-pointer font-medium">{activeReviewItem.mangaka}</span>
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-[#121212] text-[#F5F2ED]/70 text-[9px] font-bold uppercase tracking-widest rounded-none border border-[#F5F2ED]/10">
                        {activeReviewItem.phase}
                      </span>
                      <span className="px-2 py-1 bg-[#121212] text-[#F5F2ED]/70 text-[9px] font-bold uppercase tracking-widest rounded-none border border-[#F5F2ED]/10">
                        {activeReviewItem.pages}
                      </span>
                      <span className="px-2 py-1 bg-[#F5F2ED]/5 text-[#F5F2ED]/80 text-[9px] font-bold uppercase tracking-widest rounded-none border border-[#F5F2ED]/15">
                        {activeReviewItem.subTag}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => onOpenCanvas(activeReviewItem.title, activeReviewItem.coverUrl)}
                      className="flex-1 py-2 bg-transparent hover:bg-[#F5F2ED]/5 border border-[#F5F2ED]/10 text-white rounded-none font-bold text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-1.5 cursor-pointer"
                      id="tantou-open-canvas-btn"
                    >
                      <span className="material-symbols-outlined text-sm">edit_document</span>
                      <span>Open Canvas</span>
                    </button>
                    
                    <button
                      onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                      className="flex-1 py-2 bg-[#F5F2ED]/5 hover:bg-[#F5F2ED]/10 text-[#F5F2ED] border border-[#F5F2ED]/15 rounded-none font-bold text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-1.5 cursor-pointer"
                      id="tantou-feedback-btn"
                    >
                      <span className="material-symbols-outlined text-sm">add_comment</span>
                      <span>{showFeedbackInput ? "Close Box" : "Add Feedback"}</span>
                    </button>
                  </div>

                </div>

              </div>
              
              {/* Correction feedback notes creator */}
              {showFeedbackInput && (
                <form onSubmit={handleFeedbackSubmit} className="mt-5 p-4 bg-[#121212]/60 border border-[#F5F2ED]/10 rounded-none space-y-3 animate-fadeIn">
                  <h4 className="text-[10px] font-bold text-[#F5F2ED]/70 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                    <span className="material-symbols-outlined text-xs">edit_square</span>
                    <span>Draft Markup Instructions to Sensei</span>
                  </h4>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Enter pacing adjustments, scaling notes, or brush alignment requests for Sensei..."
                    className="w-full bg-[#121212] border border-[#F5F2ED]/10 rounded-none p-3 text-xs text-[#F5F2ED] focus:outline-none focus:border-[#F5F2ED]/25 resize-none h-20 font-light"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#F5F2ED] hover:bg-[#F5F2ED]/9a text-[#121212] font-semibold py-1.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                    >
                      Publish Feedback
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Pending reviews table */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 p-5 shadow-lg">
            <h3 className="font-serif text-sm font-light italic text-[#F5F2ED] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED]">pending_actions</span>
              Pending Chapter Checks
            </h3>
            
            <div className="space-y-1.5">
              {[
                { title: "Silent Echoes - Vol 3 Cover", type: "Sketch Phase", author: "Tanaka", icon: "brush", due: "Due Today", color: "text-[#F5F2ED]/50" },
                { title: "Urban Mythos - Ch 12", type: "Toning Phase", author: "Yuki", icon: "format_ink_highlighter", due: "Due Tomorrow", color: "text-[#F5F2ED]/40" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Review panel for ${item.title} is now compiling. All source clips locked.`)}
                  className="flex items-center justify-between p-3 rounded-none hover:bg-[#F5F2ED]/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#121212] rounded-none flex items-center justify-center border border-[#F5F2ED]/10">
                      <span className="material-symbols-outlined text-[#F5F2ED]/60 text-base">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#F5F2ED] group-hover:underline transition-all">{item.title}</h4>
                      <p className="text-[10px] text-[#F5F2ED]/40 mt-0.5">{item.type} • Mangaka: {item.author}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-1.5">
                    <div className="text-right">
                      <span className={`block text-[9px] font-bold uppercase tracking-wider font-mono ${item.color}`}>{item.due}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#F5F2ED]/40 text-sm group-hover:translate-x-0.5 transition-transform">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right main column (Col 4) */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Weekly progress bars */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 p-5 flex flex-col shadow-lg">
            <h3 className="font-serif text-sm font-light italic text-[#F5F2ED] mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED]">monitoring</span>
              Weekly Progress Tracker
            </h3>

            <div className="space-y-5 flex-1 justify-between">
              {[
                { name: "Neon Genesis", percent: 85, tagline: "28/32 Pages Inked", style: "bg-[#F5F2ED]", label: "text-[#F5F2ED]" },
                { name: "Silent Echoes", percent: 40, tagline: "Sketches under review", style: "bg-[#F5F2ED]/40", label: "text-[#F5F2ED]/70" },
                { name: "Urban Mythos", percent: 10, tagline: "Storyboards submitted", style: "bg-[#F5F2ED]/15", label: "text-[#F5F2ED]/40" }
              ].map((series, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#F5F2ED] tracking-wide font-serif italic font-light">{series.name}</span>
                    <span className={`${series.label} font-mono text-[10px]`}>{series.percent}%</span>
                  </div>
                  <div className="h-1 w-full bg-[#121212] rounded-none overflow-hidden border border-[#F5F2ED]/10">
                    <div
                      style={{ width: `${series.percent}%` }}
                      className={`h-full rounded-none transition-all duration-1000 ${series.style}`}
                    />
                  </div>
                  <p className="text-[9px] text-[#F5F2ED]/40 font-bold uppercase tracking-widest">{series.tagline}</p>
                </div>
              ))}
            </div>

            {/* Special series protection proposal action action */}
            <div className="mt-6 pt-5 border-t border-[#F5F2ED]/5">
              <button
                onClick={() => alert("Creative Rights Protection Proposal form initiated. Dispatching to Board.")}
                className="w-full py-2.5 bg-[#F5F2ED]/5 hover:bg-[#F5F2ED]/10 text-[#F5F2ED] border border-[#F5F2ED]/10 rounded-none font-bold text-[10px] tracking-widest uppercase transition-all flex justify-center items-center gap-1.5 group select-none cursor-pointer"
                id="protection-btn"
              >
                <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">shield</span>
                <span>Series Protection Proposal</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
