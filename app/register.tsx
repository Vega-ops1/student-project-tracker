import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 7;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);

    return minLength && hasUpperCase && hasNumber;
  };

  const handleRegister = async () => {
    if (!email.endsWith("@gmail.com")) {
      return Alert.alert("Error", "ต้องใช้ Gmail เท่านั้น");
    }

    if (!username) {
      return Alert.alert("Error", "กรุณาใส่ Username");
    }

    if (!validatePassword(password)) {
      return Alert.alert(
        "Error",
        "Password ต้องยาวอย่างน้อย 7 ตัว มีตัวพิมพ์ใหญ่ และมีตัวเลข"
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Password ไม่ตรงกัน");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // 🔥 บันทึกลง Firestore
      await setDoc(doc(db, "users", email), {
        email: email,
        username: username,
        role: "", // ยังไม่เลือกบทบาท
        loginAttempts: 0,
        lockUntil: 0,
        isBanned: false,
      });

      Alert.alert("สำเร็จ", "สมัครสมาชิกเรียบร้อย");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        สมัครสมาชิก
      </Text>

      <TextInput
        placeholder="Email (Gmail เท่านั้น)"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ color: "white", textAlign: "center" }}>
          สมัครสมาชิก
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
  },
};