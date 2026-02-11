import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useProjects } from "./context/ProjectContext";

export default function Home() {
  const router = useRouter();
  const { projects } = useProjects();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 60 }}>
      {/* ปุ่มเพิ่มโปรเจค */}
      <TouchableOpacity
        onPress={() => router.push("/add-project")}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          + เพิ่มโปรเจค
        </Text>
      </TouchableOpacity>

      {/* รายการโปรเจค */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            ยังไม่มีโปรเจค
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      {/* ปุ่ม Logout (อยู่ล่างสุด และไม่ติดขอบ) */}
      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 40, // 👈 ดันขึ้นจากขอบล่างนิดหน่อย
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
