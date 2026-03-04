import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useRouter } from "expo-router";

export default function SelectRole() {
  const router = useRouter();

  const chooseRole = async (role: string) => {
    const email = auth.currentUser?.email;
    if (!email) return;

    await updateDoc(doc(db, "users", email), {
      role: role,
    });

    if (role === "student") {
      router.replace("/projects");
    } else {
      router.replace("/teacher");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>คุณเป็นใคร?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => chooseRole("student")}
      >
        <Text style={styles.text}>นักศึกษา</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.teacherButton]}
        onPress={() => chooseRole("teacher")}
      >
        <Text style={styles.text}>อาจารย์</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  teacherButton: {
    backgroundColor: "purple",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});