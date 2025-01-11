import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { predict, testAccess } from '@/api_calls/api_calls';
import { predictionSum } from './utils';

import { useState } from 'react';
import { usePhotoStore } from './store/photoStore';

import { Prediction } from './types';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { Link, router } from 'expo-router';

const PlaceholderImage = require('@/assets/images/favicon.png');

export default function Index() {

  //################### STATE MANAGEMENT START ###################//
  
  //image selection states
  //const [selectedImage, setSelectedImage] = useState<string | URL | Request >("");
  const {photoUri, setPhotoUri} = usePhotoStore(state => state);

  //prediction states
  const [prediction, setPrediction] = useState<Prediction | undefined>(undefined);
  const [sum, setSum] = useState<number | undefined>(undefined);

  //################### STATE MANAGEMENT END ###################//

  

  //################### HANDLERS START ###################//

  
  //prediction handlers
  const handlePrediction = async () => {
    try {
      const predRes = await predict(photoUri);
      setPrediction(predRes); 
      setSum(predictionSum(predRes));
      if(prediction) {
        console.log('Prediction:', prediction.predictions);
      }
      else {
        console.log('No prediction');
      }
    } catch (error) {
      console.error(error);
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
      //setSelectedImage(result.assets[0].uri);
      setPhotoUri(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
//################### HANDLERS END ###################//

//################### RENDERING START ###################//
  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      {/* selected image view */}
      {/* white text color */}
      
      <View style={{}}>
        {
          photoUri &&  
          <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={photoUri} />
          </View>
        }
      </View>

      {/* Image view */}
      

      {/* Prediction */}
      <View>
        <Text style={styles.text}>
        prediction is: 
        {sum ? ` ${sum}` : " No prediction yet"} 
        </Text>
      </View>
      
      {/* Buttons */}
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Open camera" onPress={() => {router.push("/Camera")}}/>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={handlePrediction}/>
        <Button label="test access to server" onPress={testAccess}></Button>
      </View>
    </View>
    </ScrollView>
  );
  //################### RENDERING END ###################//
}


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    //justifyContent: 'center',
    alignItems: 'center',
    
  },
  imageContainer: {
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
    //flex: 1,
  },
  footerContainer: {
    //flex: 1 / 3,
    alignItems: 'center',
    paddingBottom: 20,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
