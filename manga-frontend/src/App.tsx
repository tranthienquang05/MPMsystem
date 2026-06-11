import { useEffect, useState } from "react"; // Đã thêm useEffect để tự động gọi API
import axios from "axios"; // Đã tích hợp thư viện Axios gọi dữ liệu từ Java
import { Role, Pitch, Notice, AssistantTask, ProjectFile } from "./types";
import {
  INITIAL_PITCHES,
  INITIAL_NOTICES,
  INITIAL_TASKS,
  INITIAL_FILES,
  TEAM_MEMBERS,
} from "./data";

// Sub-components
import SplashView from "./components/SplashView";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CanvasArea from "./components/CanvasArea";
import EditorBoardDashboard from "./components/EditorBoardDashboard";
import AssistantDashboard from "./components/AssistantDashboard";
import TantouDashboard from "./components/TantouDashboard";
import MangakaDashboard from "./components/MangakaDashboard";

// 1. Định nghĩa khuôn mẫu dữ liệu (Interface) khớp 100% với file Series.java bên Backend
interface Series {
  id: number;
  title: string;
  author: string;
}

export default function App() {
  // State variables for dynamic data simulation
  const [activeRole, setActiveRole] = useState<Role>(Role.SPLASH);

  // Khởi tạo trạng thái ban đầu bằng dữ liệu mẫu cứng, sẽ được ghi đè khi API gọi thành công
  const [pitches, setPitches] = useState<Pitch[]>(INITIAL_PITCHES);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [tasks, setTasks] = useState<AssistantTask[]>(INITIAL_TASKS);
  const [files, setFiles] = useState<ProjectFile[]>(INITIAL_FILES);
  const [team, setTeam] = useState(TEAM_MEMBERS);

  // Drawing canvas configuration
  const [canvasConfig, setCanvasConfig] = useState<{
    isOpen: boolean;
    title: string;
    backgroundImageUrl?: string;
  }>({
    isOpen: false,
    title: "",
  });

  // 2. Hàm Tự Động Chạy (useEffect) bốc dữ liệu thực tế từ Spring Boot khi ứng dụng khởi động
  useEffect(() => {
    axios.get<Series[]>('http://localhost:8080/api/series')
        .then(response => {
          // Ánh xạ (Map) mảng dữ liệu Series nhận từ Java sang đúng cấu trúc thuộc tính của mảng Pitch bên giao diện mới
          const backendPitches: Pitch[] = response.data.map(item => ({
            id: 'series-' + item.id,
            title: item.title,
            mangaka: item.author, // Đổ tên tác giả (Eiichiro Oda, Hajime Isayama,...) vào cột người vẽ
            tantou: "M. Sato (System)",
            genre: "Shonen Serialization",
            description: "Thông tin dữ liệu thực tế kết nối thời gian thực thông qua API Spring Boot Backend.",
            coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500", // Ảnh bìa tạm thời
            phase: "Active Serialization",
            pagesTotal: 32,
            pagesCompleted: 16,
            boardConsensus: 4,
            status: "approved" as const
          }));

          // Cập nhật State để ghi đè danh sách truyện từ Java lên màn hình
          setPitches(backendPitches);
        })
        .catch(error => {
          console.error("Lỗi sập kết nối hoặc chưa bật Backend Java (Port 8080):", error);
        });
  }, []);

  // Interactive callbacks
  const handleLogin = (role: Role) => {
    setActiveRole(role);
  };

  const handleSwitchRole = (role: Role) => {
    setActiveRole(role);
  };

  const handleApprovePitch = (pitchId: string) => {
    setPitches((prev) =>
        prev.map((p) =>
            p.id === pitchId
                ? { ...p, status: "approved" as const, boardConsensus: 4 }
                : p
        )
    );
    // Broadcast notification to notices list
    const approvedPitch = pitches.find((p) => p.id === pitchId);
    if (approvedPitch) {
      const newNotice: Notice = {
        id: "notice-" + Date.now(),
        type: "Update",
        time: "Just now",
        content: `Manga series pitch "${approvedPitch.title}" successfully approved by Publisher Board cabinet. Unlocking drafting!`,
        read: false,
        sender: "Board Director",
      };
      setNotices((prev) => [newNotice, ...prev]);
    }
  };

  const handleRejectPitch = (pitchId: string) => {
    setPitches((prev) =>
        prev.map((p) =>
            p.id === pitchId
                ? { ...p, status: "rejected" as const, boardConsensus: 1 }
                : p
        )
    );
  };

  const handleAddNotice = (content: string, type: Notice["type"]) => {
    const newNotice: Notice = {
      id: "notice-" + Date.now(),
      type,
      time: "Just now",
      content,
      read: false,
      sender: "Publisher Board",
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const handleOpenCanvas = (title: string, bgUrl?: string) => {
    setCanvasConfig({
      isOpen: true,
      title: `Drawing Studio: ${title}`,
      backgroundImageUrl: bgUrl,
    });
  };

  const handleSaveCanvasInk = () => {
    const savedTaskIndex = tasks.findIndex(
        (t) => canvasConfig.title.includes(t.title)
    );

    if (savedTaskIndex > -1) {
      // Increments completed percent on drawing save
      setTasks((prev) =>
          prev.map((t, idx) =>
              idx === savedTaskIndex
                  ? { ...t, completedPercent: Math.min(t.completedPercent + 25, 100) }
                  : t
          )
      );
    }

    // Displays success note
    const saveNotice: Notice = {
      id: "notice-" + Date.now(),
      type: "Update",
      time: "Just now",
      content: `Layer ink vectors for "${canvasConfig.title.replace("Drawing Studio: ", "")}" saved and updated successfully.`,
      read: false,
      sender: "Drawn Layer Engine",
    };
    setNotices((prev) => [saveNotice, ...prev]);
    setCanvasConfig({ isOpen: false, title: "" });
  };

  const handleUploadFile = (newFile: ProjectFile) => {
    setFiles((prev) => [newFile, ...prev]);
  };

  const handleAddTask = (newTask: AssistantTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddFeedbackToMangaka = (feedbackContent: string) => {
    // Generate new Editor Note notice
    const feedbackNote: Notice = {
      id: "feedback-" + Date.now(),
      type: "Editor Note",
      time: "New",
      content: feedbackContent,
      read: false,
      sender: "M. Sato (Tantou)",
    };
    setNotices((prev) => [feedbackNote, ...prev]);
  };

  const handleMarkNoticeRead = (id: string) => {
    setNotices((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleSubmitChapterDraft = (fileName: string) => {
    // Mimic files being uploaded and notices sent to Board/Tantou
    const newFileRecord: ProjectFile = {
      id: "file-" + Date.now(),
      name: fileName,
      type: "archive",
      size: "24.6 MB",
    };
    setFiles((prev) => [newFileRecord, ...prev]);

    const submitNotice: Notice = {
      id: "notice-" + Date.now(),
      type: "Priority Revision",
      time: "Just now",
      content: `Master draft check file "${fileName}" compiled and requested for check markers.`,
      read: false,
      sender: "Kato Akira (Mangaka)",
    };
    setNotices((prev) => [submitNotice, ...prev]);
  };

  // Helper trigger to create new series pitch from sidebar
  const handleRequestCreateSeries = () => {
    const title = prompt("Enter New Manga Series Pitch Name:");
    if (!title) return;

    const genre = prompt("Enter Genre (e.g., Shonen Fantasy, Sports / Comedy):") || "Fantasy / Slate";
    const desc = prompt("Enter Shorthand Series Pitch Description:") || "A marvelous story in drafting stages.";

    const newPitch: Pitch = {
      id: "series-" + Date.now(),
      title,
      mangaka: "Kato Akira",
      tantou: "M. Sato",
      genre,
      description: desc,
      coverUrl: "https://via.placeholder.com/150",
      phase: "Initial Pitch Submission",
      pagesTotal: 32,
      pagesCompleted: 0,
      boardConsensus: 0,
      status: "pending",
    };

    setPitches((prev) => [newPitch, ...prev]);
    alert(`Manga pitch "${title}" added to active queue. Switch to Publisher Board to review it!`);
  };

  const getWorkspaceTitle = (): string => {
    switch (activeRole) {
      case Role.EDITOR_BOARD:
        return "Publisher Board Workspace";
      case Role.ASSISTANT:
        return "Studio Assistant Desk";
      case Role.TANTOU_EDITOR:
        return "Tantou Chapter Reviews";
      case Role.MANGAKA:
        return "Sensei's Central Drawing Board";
      default:
        return "Sankyuu Manga Studio";
    }
  };

  // 1. Splash Page Screen (Màn hình chọn vai trò lúc mới vào app)
  if (activeRole === Role.SPLASH) {
    return <SplashView onLogin={handleLogin} />;
  }

  // 2. Dashboards Render Router inside custom layouts
  return (
      <div className="min-h-screen bg-[#121212] text-[#F5F2ED] font-sans flex antialiased relative">

        {/* Decorative vertical editorial gridlines backdrop */}
        <div className="absolute inset-y-0 left-16 right-0 grid grid-cols-6 pointer-events-none opacity-[0.03] max-w-7xl mx-auto z-0">
          <div className="border-r border-[#F5F2ED] h-full" />
          <div className="border-r border-[#F5F2ED] h-full" />
          <div className="border-r border-[#F5F2ED] h-full" />
          <div className="border-r border-[#F5F2ED] h-full" />
          <div className="border-r border-[#F5F2ED] h-full" />
          <div className="h-full" />
        </div>

        {/* Sidebar navigation */}
        <Sidebar
            currentRole={activeRole}
            onSwitchRole={handleSwitchRole}
            onRequestCreateSeries={handleRequestCreateSeries}
        />

        {/* Main viewport area positioned after sidebar */}
        <div className="flex-1 pl-16 flex flex-col min-h-screen relative overflow-hidden z-10">
          {/* Top Header bar */}
          <Header
              currentRole={activeRole}
              onSwitchRole={handleSwitchRole}
              title={getWorkspaceTitle()}
          />

          {/* Dashboard workspace switch selection */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
            {activeRole === Role.EDITOR_BOARD && (
                <EditorBoardDashboard
                    pitches={pitches}
                    notices={notices}
                    onApprovePitch={handleApprovePitch}
                    onRejectPitch={handleRejectPitch}
                    onAddNotice={handleAddNotice}
                />
            )}

            {activeRole === Role.ASSISTANT && (
                <AssistantDashboard
                    tasks={tasks}
                    notices={notices}
                    files={files}
                    onOpenCanvas={handleOpenCanvas}
                    onUploadFile={handleUploadFile}
                    onAddTask={handleAddTask}
                />
            )}

            {activeRole === Role.TANTOU_EDITOR && (
                <TantouDashboard
                    pitches={pitches}
                    notices={notices}
                    onOpenCanvas={handleOpenCanvas}
                    onApproveAndSendToBoard={handleApprovePitch}
                    onAddFeedbackToMangaka={handleAddFeedbackToMangaka}
                />
            )}

            {activeRole === Role.MANGAKA && (
                <MangakaDashboard
                    pitches={pitches}
                    notices={notices}
                    team={team}
                    onOpenCanvas={handleOpenCanvas}
                    onMarkNoticeRead={handleMarkNoticeRead}
                    onSubmitChapterDraft={handleSubmitChapterDraft}
                />
            )}
          </main>
        </div>

        {/* drawing Canvas overlay modal */}
        {canvasConfig.isOpen && (
            <CanvasArea
                title={canvasConfig.title}
                backgroundImageUrl={canvasConfig.backgroundImageUrl}
                onClose={() => setCanvasConfig({ isOpen: false, title: "" })}
                onSave={handleSaveCanvasInk}
            />
        )}
      </div>
  );
}