export enum Role {
  SPLASH = "splash",
  EDITOR_BOARD = "editor_board",
  ASSISTANT = "assistant",
  TANTOU_EDITOR = "tantou_editor",
  MANGAKA = "mangaka"
}

export interface Pitch {
  id: string;
  title: string;
  mangaka: string;
  tantou: string;
  genre: string;
  description: string;
  coverUrl: string;
  phase: string;
  pagesTotal: number;
  pagesCompleted: number;
  boardConsensus: number; // number of positive votes (0-4)
  status: "pending" | "approved" | "rejected" | "drafting" | "inking" | "archived";
  dueDays?: number;
  notes?: string;
  tags?: string[];
}

export interface Notice {
  id: string;
  type: "Priority Revision" | "Update" | "Urgent" | "Editor Note";
  time: string;
  content: string;
  read: boolean;
  sender?: string;
}

export interface AssistantTask {
  id: string;
  priority: "High Priority" | "Inking" | "Drafting" | "Toning";
  chapter: string;
  title: string;
  description: string;
  dueText: string;
  completedPercent: number;
  filesCount: number;
  artworkUrl?: string;
  mangakaAvatar?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: "image" | "archive" | "pdf" | "other";
  size: string;
  url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: "online" | "idle" | "offline";
  avatar: string;
  initials: string;
  statusColor: string;
}
