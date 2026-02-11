import { StyleSheet, Text, View } from "react-native";

type ProjectCardProps = {
  title: string;
  description: string;
  progress: number;
};

export default function ProjectCard({
  title,
  description,
  progress,
}: ProjectCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <Text style={styles.progress}>ความคืบหน้า: {progress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progress: {
    marginTop: 8,
    fontWeight: "600",
  },
});
