import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput, Image, Dimensions } from "react-native";
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

const aspectRatioData =[
  { label: '1/1', value: '1/1' },
  { label: '16/9', value: '16/9' },
  { label: '9/16', value: '9/16' },
];



export default function Index() {
  const [model, setModel] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


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
          placeholder="Select Model"
          value={model}
          onChange={item => {
            setModel(item.value);
          }}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={aspectRatioData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Aspect Ratio"
          value={aspectRatio}
          onChange={item => {
            setAspectRatio(item.value);
          }}
        />

        <TouchableOpacity style = {styles.button}onPress = {() => {}}>
          <Text style = {styles.buttonText}>Generate Image</Text>
        </TouchableOpacity>

        <View style = {styles.imageContainer}>
          <Image source={require('@/sample-image.jpg')} style = {styles.image}></Image>
        </View>

        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.downLoadButton}onPress = {() => {}}>
            <FontAwesome5 name="download" size={20}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.downLoadButton}onPress = {() => {}}>
            <FontAwesome5 name="share" size = {20} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const windowWidth = Dimensions.get('window').width;

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
  button: {
    marginTop: 20,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.black,
    letterSpacing: 1.2,
    fontWeight: "700",
    fontSize: 18,
  },
  imageContainer: {
    height: 300,
    width: windowWidth-40,
    marginTop: 20,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  downLoadButton: {
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: '50%',
    justifyContent: "center",
    alignItems: 'center',
    height: 45,
    width: 45,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
  }
});
