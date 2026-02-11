import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [failCount, setFailCount] = useState(0);
  const [lockStage, setLockStage] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  const MAX_FAIL = 3;

  // ⏱ ตรวจสอบ cooldown
  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();

      if (now >= cooldownUntil) {
        setCooldownUntil(null);
        setFailCount(0);
        Alert.alert("หมดเวลาคูลดาวน์", "คุณสามารถลองเข้าสู่ระบบใหม่ได้");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const handleLogin = () => {
    const now = Date.now();

    // 🔒 ล็อกถาวร
    if (lockStage === 3) {
      Alert.alert("บัญชีถูกล็อกถาวร", "กรุณาติดต่อผู้ดูแลระบบ");
      return;
    }

    // ⏳ อยู่ในช่วง cooldown
    if (cooldownUntil && now < cooldownUntil) {
      const secondsLeft = Math.ceil((cooldownUntil - now) / 1000);
      Alert.alert("ติดคูลดาวน์", `กรุณารออีก ${secondsLeft} วินาที`);
      return;
    }

    // ✅ ล็อกอินถูกต้อง
    if (username === "student" && password === "1234") {
      setFailCount(0);
      router.replace("/");
      return;
    }

    // ❌ ล็อกอินผิด
    const newFail = failCount + 1;
    setFailCount(newFail);

    if (newFail >= MAX_FAIL) {
      if (lockStage === 0) {
        setCooldownUntil(now + 5 * 60 * 1000); // 5 นาที
        setLockStage(1);
        Alert.alert("ใส่ผิดครบ 3 ครั้ง", "ติดคูลดาวน์ 5 นาที");
      } else if (lockStage === 1) {
        setCooldownUntil(now + 30 * 60 * 1000); // 30 นาที
        setLockStage(2);
        Alert.alert("ใส่ผิดอีกครั้ง", "ติดคูลดาวน์ 30 นาที");
      } else if (lockStage === 2) {
        setLockStage(3);
        Alert.alert("บัญชีถูกล็อกถาวร", "กรุณาติดต่อผู้ดูแลระบบ");
      }
      setFailCount(0);
    } else {
      Alert.alert("Login ไม่สำเร็จ", `รหัสผิด (${newFail}/${MAX_FAIL})`);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      {/* 🔵 ปุ่ม Login */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          LOGIN
        </Text>
      </TouchableOpacity>

      {/* 🟢 สมัครสมาชิก */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={{ marginBottom: 10 }}
      >
        <Text style={{ textAlign: "center", color: "green" }}>สมัครสมาชิก</Text>
      </TouchableOpacity>

      {/* 🔵 ลืมรหัสผ่าน */}
      <TouchableOpacity onPress={() => router.push("/reset-password")}>
        <Text style={{ textAlign: "center", color: "#2196F3" }}>
          ลืมรหัสผ่าน?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
