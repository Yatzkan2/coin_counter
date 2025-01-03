import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraProps } from '@/app/types';
import { usePhotoStore } from './store/photoStore';

import { predict, testAccess } from '@/api_calls/api_calls';
import { predictionSum } from './utils';
import { Prediction } from './types';
import { router } from 'expo-router';


export default function Camera() {
  // Add camera ref
  const cameraRef = useRef<any>(null);

  // Add photo store
  const setPhotoUri = usePhotoStore(state => state.setPhotoUri);

  //camera states
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //camera handlers
  const toggleCameraFacing = (): void => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  const handlePrediction = async (selectedImage: string) => {
    const predRes = await predict(selectedImage);
    
    if(predRes) {
      console.log('Prediction:', predRes);
    }
    else {
      console.log('No prediction');
    }
  }

  // Add take picture function
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: true
        });
        //console.log('Photo taken:', photo.uri);
        setPhotoUri(photo.uri);
        router.replace('/');
        // Here you can handle the photo - save it, display it, send it to a server, etc.
        return photo;
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    } else {
      console.log('Camera ref not ready');
    }
  };
  return (
    <CameraView 
      ref={cameraRef}
      style={styles.camera} 
      facing={facing}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
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