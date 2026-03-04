import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useProjects } from "../context/ProjectContext";
import { auth } from "../firebase";

export default function Home() {
  const router = useRouter();
  const { projects } = useProjects();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

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
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/project-detail",
                params: {
                  name: item.name,
                  fileUrl: item.fileUrl,
                },
              })
            }
          >
            <View
              style={{
                padding: 15,
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ปุ่ม Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}