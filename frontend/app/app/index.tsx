import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { predict, testAccess } from '@/api_calls/api_calls';
import { predictionSum } from './utils';

import { useState } from 'react';

import { Prediction } from './types';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/favicon.png');

export default function Index() {

  //################### STATE MANAGEMENT START ###################//
  //image selection states
  const [selectedImage, setSelectedImage] = useState<string | URL | Request >("");

  //camera states
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  //prediction states
  const [prediction, setPrediction] = useState<Prediction | undefined>(undefined);
  const [sum, setSum] = useState<number | undefined>(undefined);

  //################### STATE MANAGEMENT END ###################//

  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

//################### HANDLERS START ###################//

  //camera handlers
  const toggleCameraFacing = (): void => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  //prediction handlers
  const handlePrediction = async () => {
    const predRes = await predict(selectedImage);
    setPrediction(predRes);
    setSum(predictionSum(predRes));
    if(prediction) {
      console.log('Prediction:', prediction.predictions);
    }
    else {
      console.log('No prediction');
    }
  }

  //image selection handlers
  const pickImageAsync = async () => {
    console.log('Selecting an image...');
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
//################### HANDLERS END ###################//

//################### RENDERING START ###################//
  return (
    <View style={styles.container}>
      <ScrollView >
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View>
        <Text style={{color:"white"}}>
          prediction is: 
          {sum ? ` ${sum}` : " No prediction yet"} 
        </Text>
      
      </View>
      
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={handlePrediction}/>
        <Button label="test access to server" onPress={testAccess}></Button>
      </View>
      </ScrollView>
    </View>
  );
  //################### RENDERING END ###################//
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
