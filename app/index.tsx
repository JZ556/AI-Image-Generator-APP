import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "AI Image Generator",
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <View style={styles.container}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
});
