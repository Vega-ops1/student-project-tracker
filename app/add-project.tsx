import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function AddProject() {
  const [file, setFile] = useState<any>(null);

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

  // บันทึกไฟล์เข้าเครื่อง (จำลองการอัปโหลด)
  const saveFile = async () => {
    if (!file) {
      Alert.alert("กรุณาเลือกไฟล์ก่อน");
      return;
    }

    try {
      const newPath = FileSystem.Paths.document + "/" + file.name;

      await FileSystem.copyAsync({
        from: file.uri,
        to: newPath,
      });

      Alert.alert("อัปโหลดสำเร็จ");
      setFile(null);
    } catch (error) {
      Alert.alert("เกิดข้อผิดพลาด");
      console.log(error);
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

      {/* แสดงชื่อไฟล์ */}
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
