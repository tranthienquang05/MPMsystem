import React, { useState } from "react";
import { Notice, AssistantTask, ProjectFile } from "../types";

interface AssistantProps {
  tasks: AssistantTask[];
  notices: Notice[];
  files: ProjectFile[];
  onOpenCanvas: (taskTitle: string, bgUrl?: string) => void;
  onUploadFile: (newFile: ProjectFile) => void;
  onAddTask: (task: AssistantTask) => void;
}

export default function AssistantDashboard({
  tasks,
  notices,
  files,
  onOpenCanvas,
  onUploadFile,
  onAddTask,
}: AssistantProps) {
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [quickNoteTitle, setQuickNoteTitle] = useState("");
  const [quickNoteDesc, setQuickNoteDesc] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadFileType, setUploadFileType] = useState<ProjectFile["type"]>("image");

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleQuickNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteTitle.trim()) return;

    const newTask: AssistantTask = {
      id: "addon-" + Date.now(),
      priority: "Drafting",
      chapter: "Vol 14. Ch 112",
      title: quickNoteTitle,
      description: quickNoteDesc || "Created via quick task planner.",
      dueText: "Due in 3 days",
      completedPercent: 0,
      filesCount: 0,
    };

    onAddTask(newTask);
    setQuickNoteTitle("");
    setQuickNoteDesc("");
    setShowQuickNote(false);
  };

  const handleFileUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    // Mimic actual upload timing
    setTimeout(() => {
      const extensionTuple: Record<ProjectFile["type"], string> = {
        image: ".png",
        archive: ".zip",
        pdf: ".pdf",
        other: ".clip",
      };

      const finalName = uploadFileName.includes(".")
        ? uploadFileName 
        : uploadFileName + extensionTuple[uploadFileType];

      onUploadFile({
        id: "file-" + Date.now(),
        name: finalName,
        type: uploadFileType,
        size: (Math.random() * 15 + 1).toFixed(1) + " MB",
      });

      setIsUploading(false);
      setUploadFileName("");
      setShowUploadModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Title */}
      <div className="mb-6">
        <h1 className="font-serif text-4xl font-light tracking-wide text-[#F5F2ED] italic mb-2" id="assistant-header">
          Assistant Dashboard
        </h1>
        <p className="text-xs text-[#F5F2ED]/60 font-sans max-w-2xl font-light">
          Track background layers and speedline drafting schedules assigned by Sensei.
        </p>
      </div>

      {/* Stats Bento Grid Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        {/* Pending tasks stats */}
        <div className="bg-[#181818] rounded-none p-5 border border-[#F5F2ED]/10 hover:bg-[#F5F2ED]/5 transition-all group cursor-default">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] text-[#F5F2ED]/50 font-bold uppercase tracking-widest">Pending Tasks</span>
            <span className="material-symbols-outlined text-[#F5F2ED] fill">pending_actions</span>
          </div>
          <div className="font-serif text-3xl font-light italic text-[#F5F2ED] leading-none">{tasks.length + 10}</div>
          <p className="text-[10px] text-[#F5F2ED]/50 mt-2 font-mono uppercase tracking-widest">3 Due Today</p>
        </div>

        {/* Active drawing board stats */}
        <div className="bg-[#181818] rounded-none p-5 border border-[#F5F2ED]/10 hover:bg-[#F5F2ED]/5 transition-all group cursor-default">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] text-[#F5F2ED]/50 font-bold uppercase tracking-widest">In Progress</span>
            <span className="material-symbols-outlined text-[#F5F2ED]">draw</span>
          </div>
          <div className="font-serif text-3xl font-light italic text-[#F5F2ED] leading-none">{tasks.length}</div>
          <p className="text-[10px] text-[#F5F2ED]/50 mt-2 font-sans font-light">Active drafting canvases</p>
        </div>

        {/* Editor Reviews stats */}
        <div className="bg-[#181818] rounded-none p-5 border border-[#F5F2ED]/10 hover:bg-[#F5F2ED]/5 transition-all group cursor-default">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] text-[#F5F2ED]/50 font-bold uppercase tracking-widest">Editor Reviews</span>
            <span className="material-symbols-outlined text-[#F5F2ED]">assignment_return</span>
          </div>
          <div className="font-serif text-3xl font-light italic text-[#F5F2ED] leading-none">1</div>
          <p className="text-[10px] text-red-400 mt-2 font-sans font-medium uppercase tracking-wider">Needs revision soon</p>
        </div>

        {/* Quick Note creation box */}
        <div 
          onClick={() => setShowQuickNote(!showQuickNote)}
          className="bg-[#181818] hover:bg-[#F5F2ED]/5 rounded-none p-5 border border-[#F5F2ED]/15 border-dashed flex flex-col justify-center items-center cursor-pointer transition-all group select-none"
        >
          <span className="material-symbols-outlined text-[#F5F2ED]/60 mb-1 group-hover:text-[#F5F2ED] transition-colors">
            {showQuickNote ? "close" : "add_box"}
          </span>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#F5F2ED]/60 group-hover:text-[#F5F2ED] transition-colors">
            {showQuickNote ? "Close Planner" : "Quick Note Planner"}
          </span>
        </div>
      </div>

      {/* Main Content Layout SPLIT: Drawing board (Col 8) vs Notices/Files (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Drawing Board Tasks list (Col span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Quick Note input drawer overlay */}
          {showQuickNote && (
            <div className="bg-[#1c1c1c] p-5 rounded-none border border-[#F5F2ED]/15 mt-[-10px] animate-fadeIn font-sans space-y-4">
              <h4 className="font-serif text-sm font-light italic text-[#F5F2ED] flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-[#F5F2ED] fill">edit</span>
                Task Quick Planner
              </h4>
              <form onSubmit={handleQuickNoteSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={quickNoteTitle}
                    onChange={(e) => setQuickNoteTitle(e.target.value)}
                    placeholder="Task name (e.g., Screentone details panel 3)..."
                    className="bg-[#121212] text-xs text-[#F5F2ED] p-2 border border-[#F5F2ED]/10 rounded-none focus:outline-none focus:border-[#F5F2ED]/25 w-full font-light"
                    required
                  />
                  <input
                    type="text"
                    value={quickNoteDesc}
                    onChange={(e) => setQuickNoteDesc(e.target.value)}
                    placeholder="Short notes or dependencies..."
                    className="bg-[#121212] text-xs text-[#F5F2ED] p-2 border border-[#F5F2ED]/10 rounded-none focus:outline-none focus:border-[#F5F2ED]/25 w-full font-light"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold py-1.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                  >
                    Add Task to Board
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 overflow-hidden flex flex-col h-[520px] shadow-lg">
            <div className="px-6 py-4 border-b border-[#F5F2ED]/10 flex justify-between items-center bg-[#1c1c1c]/40">
              <h3 className="font-serif text-base font-light italic text-[#F5F2ED]">Active Drawing Board</h3>
              <span className="text-[10px] text-[#F5F2ED]/40 uppercase tracking-widest font-bold font-sans">Vol 14 Chapter 112 Drafts</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-sans">
              
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#121212]/30 border border-[#F5F2ED]/10 rounded-none p-5 hover:border-[#F5F2ED]/20 transition-all duration-300 group cursor-default relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#F5F2ED]/60" />
                  
                  <div className="flex justify-between items-start pl-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-none font-bold uppercase tracking-wider text-[9px] ${
                          task.priority === "High Priority"
                            ? "bg-red-950/40 text-red-300 border border-red-900/30"
                            : "bg-[#F5F2ED]/5 text-[#F5F2ED]/80 border border-[#F5F2ED]/10"
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#F5F2ED]/40 font-bold">
                          {task.chapter}
                        </span>
                      </div>
                      
                      <h4 className="font-serif font-light italic text-lg text-[#F5F2ED] group-hover:text-[#F5F2ED] transition-colors mt-1.5">
                        {task.title}
                      </h4>
                      <p className="text-xs text-[#F5F2ED]/70 mt-1 leading-relaxed font-light font-sans">
                        {task.description}
                      </p>
                    </div>

                    {task.mangakaAvatar && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F5F2ED]/10 shrink-0 ml-3 grayscale">
                        <img src={task.mangakaAvatar} alt="Mangaka assignment avatar" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pl-2 flex justify-between items-center border-t border-[#F5F2ED]/5 pt-4">
                    <div className="flex gap-4 text-[#F5F2ED]/50 text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1 font-sans">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {task.dueText}
                      </span>
                      {task.filesCount > 0 && (
                        <span className="flex items-center gap-1 font-sans">
                          <span className="material-symbols-outlined text-base">attach_file</span>
                          {task.filesCount} Files
                        </span>
                      )}
                      
                      {task.completedPercent > 0 && (
                        <div className="flex items-center gap-2 font-sans">
                          <span className="font-mono">{task.completedPercent}%</span>
                          <div className="w-16 h-1 bg-[#F5F2ED]/10 rounded-none overflow-hidden">
                            <div style={{ width: `${task.completedPercent}%` }} className="bg-[#F5F2ED] h-full rounded-none" />
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenCanvas(task.title, task.artworkUrl)}
                      className="text-[#F5F2ED] hover:underline text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer group/btn"
                    >
                      <span>Open Canvas</span>
                      <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="text-xs text-[#F5F2ED]/40 text-center italic py-12">No drawing tickets assigned currently.</p>
              )}

            </div>
          </div>

        </div>

        {/* Notices Board & Project Files columns (Col span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Recent notices / alerts panel */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 p-5 flex flex-col relative overflow-hidden shadow-lg font-sans">
            <h3 className="font-serif text-sm font-light italic text-[#F5F2ED] mb-3.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED]">notifications_active</span>
              Urgent Notices
            </h3>
            
            <div className="flex flex-col gap-3">
              {notices.filter(n => n.type === "Urgent" || n.type === "Editor Note").slice(0, 2).map((notice) => (
                <div
                  key={notice.id}
                  className={`p-3 rounded-none border-l-2 bg-[#121212]/55 cursor-default ${
                    notice.type === "Urgent" ? "border-red-400" : "border-[#F5F2ED]/25"
                  }`}
                >
                  <p className="text-xs text-[#F5F2ED]/80 leading-relaxed font-light">
                    <strong className={notice.type === "Urgent" ? "text-red-400" : "text-[#F5F2ED] font-bold uppercase tracking-wider text-[10px] block mb-1"}>
                      {notice.type === "Urgent" ? "Urgent: " : ""}
                    </strong>
                    {notice.content}
                  </p>
                  <span className="text-[9px] text-[#F5F2ED]/40 mt-1 block font-mono">
                    {notice.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Files Asset database */}
          <div className="bg-[#181818] rounded-none border border-[#F5F2ED]/10 p-5 flex-1 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-sm font-light italic text-[#F5F2ED]">Project Files</h3>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="text-[10px] uppercase tracking-widest text-[#F5F2ED] hover:underline font-bold font-sans flex items-center gap-1 cursor-pointer"
                  id="trigger-upload-modal-btn"
                >
                  <span className="material-symbols-outlined text-xs">upload_file</span>
                  Add File
                </button>
              </div>

              {/* Grid of files matching screenshots */}
              <div className="grid grid-cols-2 gap-3 mb-4 font-sans">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-[#121212]/30 border border-[#F5F2ED]/10 rounded-none p-2.5 hover:bg-[#F5F2ED]/5 transition-colors cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="w-full h-16 bg-[#121212] rounded-none mb-2 flex items-center justify-center border border-[#F5F2ED]/10">
                      <span className="material-symbols-outlined text-[#F5F2ED]/60 text-3xl group-hover:scale-110 transition-transform">
                        {file.type === "image" ? "image" : file.type === "archive" ? "brush" : "description"}
                      </span>
                    </div>
                    
                    <span className="text-[10px] text-[#F5F2ED] font-bold truncate w-full tracking-wide">
                      {file.name}
                    </span>
                    <span className="text-[9px] text-[#F5F2ED]/40 font-mono mt-0.5">
                      {file.size}
                    </span>
                  </div>
                ))}

                {/* Upload Box button indicator */}
                <div
                  onClick={() => setShowUploadModal(true)}
                  className="bg-transparent border border-[#F5F2ED]/10 border-dashed rounded-none p-2 flex flex-col items-center justify-center text-center hover:bg-[#F5F2ED]/5 transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[#F5F2ED]/40 text-xl group-hover:text-[#F5F2ED] transition-colors">
                    upload_file
                  </span>
                  <span className="text-[9px] text-[#F5F2ED]/40 font-bold uppercase tracking-widest mt-1 group-hover:text-[#F5F2ED] transition-colors font-sans">
                    Upload File
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-[#F5F2ED]/30 text-center font-sans mt-3">
              All brushes, reference inks, and scene scripts are compiled securely.
            </p>
          </div>

        </div>

      </div>

      {/* Upload File Dialog Overlay modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#F5F2ED]/15 rounded-none w-full max-w-sm p-6 shadow-2xl font-sans" id="file-upload-modal">
            <h3 className="font-serif italic font-light text-2xl text-[#F5F2ED] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5F2ED]">upload_file</span>
              Upload Asset File
            </h3>
            <p className="text-[11px] text-[#F5F2ED]/55 mb-4">
              Select key file format to upload and share immediately with Sensei and assistants.
            </p>

            <form onSubmit={handleFileUploadSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-[#F5F2ED]/60 font-bold uppercase tracking-widest block">File Name:</label>
                <input
                  type="text"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  placeholder="e.g., BackgroundGridRef..."
                  className="bg-[#121212] text-xs text-[#F5F2ED] border border-[#F5F2ED]/10 rounded-none p-2.5 focus:outline-none focus:border-[#F5F2ED]/25 w-full font-light"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-[#F5F2ED]/60 font-bold uppercase tracking-widest block">File Type Category:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "image", label: "Image / Ref", icon: "image" },
                    { type: "archive", label: "Custom Brushes", icon: "brush" },
                    { type: "pdf", label: "Script / Docs", icon: "description" },
                    { type: "other", label: "Manga Frame", icon: "grid_on" },
                  ].map((cat) => (
                    <button
                      key={cat.type}
                      type="button"
                      onClick={() => setUploadFileType(cat.type as ProjectFile["type"])}
                      className={`p-2 rounded-none border text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-1.5 transition-all ${
                        uploadFileType === cat.type 
                          ? "bg-[#F5F2ED] text-[#121212] border-transparent" 
                          : "bg-[#121212] border-[#F5F2ED]/10 text-[#F5F2ED]/50 hover:bg-[#F5F2ED]/5 hover:text-[#F5F2ED]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {isUploading ? (
                <div className="flex items-center justify-center gap-2 text-xs text-[#F5F2ED] py-3">
                  <div className="w-4 h-4 border-2 border-[#F5F2ED] border-t-transparent rounded-full animate-spin"></div>
                  Uploading securely to workspace...
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED] hover:bg-[#F5F2ED]/5 font-bold rounded-none uppercase tracking-widest text-[11px] py-1.5 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold tracking-widest font-bold rounded-none uppercase text-[11px] py-1.5 px-4"
                    id="submit-file-btn"
                  >
                    Upload Asset
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
