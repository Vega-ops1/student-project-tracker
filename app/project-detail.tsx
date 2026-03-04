import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function ProjectDetail() {
  const { name, fileUrl } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, paddingTop: 60 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {name}
        </Text>
      </View>

      <WebView
        source={{ uri: fileUrl as string }}
        style={{ flex: 1 }}
      />
    </View>
  );
}