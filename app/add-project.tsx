import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AddProject() {
  const [file, setFile] = useState<any>(null);
  const router = useRouter();

  // เลือกไฟล์
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (!result.canceled) {
      const selectedFile = result.assets[0];
      setFile(selectedFile);
      Alert.alert("เลือกไฟล์สำเร็จ", selectedFile.name);
    }
  };

  // บันทึกเข้า Firestore (โหมดมหาลัย)
  const saveFile = async () => {
    if (!file) {
      Alert.alert("กรุณาเลือกไฟล์ก่อน");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("กรุณา login ใหม่");
        return;
      }

      // บันทึกลง database
      await addDoc(collection(db, "projects"), {
        name: file.name,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      Alert.alert("สำเร็จ", "เพิ่มเอกสารโปรเจคแล้ว");

      setFile(null);

      // กลับหน้า list
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>อัปโหลดโปรเจค</Text>

      {/* ปุ่มเลือกไฟล์ */}
      <TouchableOpacity
        onPress={pickDocument}
        style={{
          backgroundColor: "#999",
          padding: 15,
          marginBottom: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>เลือกไฟล์</Text>
      </TouchableOpacity>

      {/* ชื่อไฟล์ */}
      {file && (
        <Text style={{ marginBottom: 20 }}>ไฟล์ที่เลือก: {file.name}</Text>
      )}

      {/* ปุ่มบันทึก */}
      <TouchableOpacity
        onPress={saveFile}
        style={{
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  );
}
