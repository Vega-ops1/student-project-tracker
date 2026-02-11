import { Stack } from "expo-router";
import { ProjectProvider } from "./context/ProjectContext";

export default function RootLayout() {
  return (
    <ProjectProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProjectProvider>
  );
}
