export type Project = {
  id: number;
  title: string;
  description: string;
  progress: number; // %
};

export const projects: Project[] = [
  {
    id: 1,
    title: "ระบบติดตามโปรเจคนักศึกษา",
    description: "แอปสำหรับอาจารย์ดูความคืบหน้าโปรเจค",
    progress: 30,
  },
  {
    id: 2,
    title: "เครื่องบีบกระป๋องอัตโนมัติ",
    description: "ควบคุมด้วยแอปมือถือ",
    progress: 70,
  },
];
