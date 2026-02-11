import { createContext, useContext, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
};

const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
