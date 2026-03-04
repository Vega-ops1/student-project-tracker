import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      return Alert.alert("Error", "กรุณาใส่อีเมล");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("สำเร็จ", "ระบบส่งลิงก์รีเซ็ตรหัสไปที่อีเมลแล้ว");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        ลืมรหัสผ่าน
      </Text>

      <TextInput
        placeholder="กรอก Email ของคุณ"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 8,
        }}
        onPress={handleReset}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          ส่งลิงก์รีเซ็ตรหัสผ่าน
        </Text>
      </TouchableOpacity>
    </View>
  );
}