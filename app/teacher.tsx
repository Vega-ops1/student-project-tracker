import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "expo-router";

export default function Teacher() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login"); // กลับหน้า login
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Teacher Page</Text>

      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
}