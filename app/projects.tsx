import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-project")}
      >
        <Text style={styles.addButtonText}>+ เพิ่มโปรเจค</Text>
      </TouchableOpacity>

      {projects.length === 0 ? (
        <Text style={styles.emptyText}>ยังไม่มีโปรเจค</Text>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.projectItem}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  addButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  projectItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  logout: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    marginTop: "auto",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});