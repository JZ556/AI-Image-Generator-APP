import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";
import {Dropdown} from "react-native-element-dropdown"; 
import { useState } from "react";

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
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

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
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
  dropdown:{
    marginTop: 20,
    height: 50,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    borderColor: Colors.accent,
    padding:12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholderStyle:{
    fontSize: 16,
    color: Colors.placeholder,

  },
  selectedTextStyle:{
    fontSize: 16,
    color: Colors.text,
  },
});
