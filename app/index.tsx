import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";




export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "AI Image Generator",
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { color: Colors.text }
        }}
      />
      <View style={styles.container}>
        <View style= {{height:150}}>
          <TextInput
            placeholder="Describe your image imagination in detail..."
            placeholderTextColor={Colors.placeholder}
            style={styles.inputField}
            numberOfLines={3}
            multiline={true}
          />
          <TouchableOpacity style={styles.ideaButton} onPress={() => {}}>
            <FontAwesome5 name="dice" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
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
  inputField: {
    backgroundColor: Colors.dark,
    borderRadius: 10,
    padding: 20,
    borderColor: Colors.accent,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
    height: 150,
    color: Colors.text,
  },
  ideaButton: {
    backgroundColor: Colors.accent,
    padding: 16,
    borderRadius: "50%",
    alignSelf: "flex-end",
    position: "relative",
    bottom: 60,
    right: 20,
  }
});
