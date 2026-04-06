import { Colors } from "@/utils/Colors";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, TextInput, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { calculateDimensions } from "@/utils/Helpers";
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';
import { File, Paths } from "expo-file-system";


const examplePrompts = [
  "A beautiful sunset over a calm ocean",
  "A group of penguins swimming in the ocean",
  "A close-up of a flower with a bee hovering nearby",
  "A portrait of a young woman with long brown hair",
  "A photo of a cat sleeping on a couch",
  "A landscape painting of a snowy mountain",
  "A macro shot of a raindrop on a leaf",
  "A black and white photo of an old building",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
]

const modelData = [
  { label: 'Flux.1-dev', value: 'black-forest-labs/FLUX.1-dev' },
  { label: 'Flux.1-schnell', value: 'black-forest-labs/FLUX.1-schnell' },
  { label: 'Stable Diffusion 3.5L', value: 'stabilityai/stable-diffusion-3.5-large' },
  { label: 'Stable Diffusion XL', value: 'stabilityai/stable-diffusion-xl-base-1.0' },
  { label: 'Stable Diffusion v1.5', value: 'stable-diffusion-v1-5' },
];

const aspectRatioData = [
  { label: '1/1', value: '1/1' },
  { label: '16/9', value: '16/9' },
  { label: '9/16', value: '9/16' },
];

/** Decodes base64 to bytes for `File.write` — native `write` currently expects a single argument (no options object on some iOS builds). */
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("");
  const [imageURL, setImageURL] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generatePrompt = () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(randomPrompt);
  };


  const generateImage = async () => {
    console.log(prompt + model + aspectRatio);
    setImageURL("");
    setIsLoading(true);
    const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${model}`;
    const { width, height } = calculateDimensions(aspectRatio);
    console.log("width:", width);
    console.log("height:", height);
    const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width, height },
        }),
      })

      if (!response.ok) {
        throw new Error((await response.json()).error);
      };
      const blob = await response.blob();
      console.log(blob);

      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = () => {
        const base64Data = fileReaderInstance.result;
        setImageURL(base64Data);
        setIsLoading(false);
        console.log('Image Url:', base64Data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error instanceof Error) {
        if (error.message.includes("429")) {
          alert("huggingface API rate limit exceeded. Please try again later.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    };
  };

  const handleDownload = async () => {
    if (!imageURL || typeof imageURL !== "string") {
      alert("No image to save yet.");
      return;
    }

    const comma = imageURL.indexOf(",");
    const base64Code = comma >= 0 ? imageURL.slice(comma + 1) : imageURL;
    if (!base64Code) {
      alert("Could not read image data.");
      return;
    }

    const date = moment().format("YYYYMMDDHHmmss");
    const file = new File(Paths.cache, `${date}.jpeg`);

    try {
      file.create({ overwrite: true });
      file.write(base64ToUint8Array(base64Code));

      await MediaLibrary.saveToLibraryAsync(file.uri);

      file.delete();
      alert("Image saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Could not save the image. Check photo library permission.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "AI Image Generator",
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { color: Colors.text }
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, }}>
        <ScrollView style={styles.container}>
          <View >
            <View style={{ height: 150 }}>
              <TextInput
                placeholder="Describe your image imagination in detail..."
                placeholderTextColor={Colors.placeholder}
                style={styles.inputField}
                numberOfLines={3}
                multiline={true}
                value={prompt}
                onChangeText={text => setPrompt(text)}
              />
              <TouchableOpacity style={styles.ideaButton} onPress={() => generatePrompt()}>
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

            <TouchableOpacity style={styles.button} onPress={() => generateImage()}>
              <Text style={styles.buttonText}>Generate Image</Text>
            </TouchableOpacity>



            {isLoading && (
              <View style={[styles.imageContainer, { justifyContent: 'center' }]}>
                <ActivityIndicator size={'large'} ></ActivityIndicator>
              </View>
            )}

            {(!isLoading && imageURL) && (
              <>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: imageURL }} style={styles.image}></Image>
                </View>


                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.downLoadButton} onPress={() => handleDownload()}>
                    <FontAwesome5 name="download" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.downLoadButton} onPress={() => { }}>
                    <FontAwesome5 name="share" size={20} />
                  </TouchableOpacity>
                </View>
              </>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    width: windowWidth - 40,
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
