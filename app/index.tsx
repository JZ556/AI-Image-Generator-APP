import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const modelData = [
  { label: 'Flux.1-dev', value: 'black-forest-labs/FLUX.1-dev' },
  { label: 'Flux.1-schnell', value: 'black-forest-labs/FLUX.1-schnell' },
  { label: 'Stable Diffusion 3.5L', value: 'stabilityai/stable-diffusion-3.5-large' },
  { label: 'Stable Diffusion XL', value: 'stabilityai/stable-diffusion-xl-base-1.0' },
  { label: 'Stable Diffusion v1.5', value: 'stable-diffusion-v1-5' },
];



export default function Index() {
  const [value, setValue] = useState(null);


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
        <View style={{ height: 150 }}>
          <TextInput
            placeholder="Describe your image imagination in detail..."
            placeholderTextColor={Colors.placeholder}
            style={styles.inputField}
            numberOfLines={3}
            multiline={true}
          />
          <TouchableOpacity style={styles.ideaButton} onPress={() => { }}>
            <FontAwesome5 name="dice" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={modelData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
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
  },
  dropdown: {
    marginTop: 20,
    height: 50,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    borderColor: Colors.accent,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.placeholder,

  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.text,
  },
});
