import { React, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Pressable } from 'react-native';


export default function App() {

  const [input, onChangeInput] = useState()
  const [result, onChangeResult] = useState();
  const [length, setLength] = useState({l:'miles', r:'miles'});
  const [status, setStatus] = useState({modal:false, lenDirection:'l'});

  let lenLeft = length.l, lenRight = length.r

  const lengthOnChange = (len) => {
    setStatus({modal:false, lenDirection: status.lenDirection})

    if (status.lenDirection === 'l') lenLeft = len
    else if (status.lenDirection === 'r') lenRight = len

    setLength({l:lenLeft, r:lenRight})
    
    onChangeResult('')
    onChangeInput('')
  }

  const calculate = (num) => {
    onChangeInput(num)
    num = parseInt(num)

    // Same Length
    if (length.l === lenRight.r) num *= 1
    
    // Miles
    if (length.l === 'miles' && length.r === 'kilometers') num *= 1.60934
    if (length.l === 'miles' && length.r === 'meters')  num *= 1609.344
    if (length.l === 'miles' && length.r === 'feet') num *= 5280
    if (length.l === 'miles' && length.r === 'inches') num *= 63360
    if (length.l === 'miles' && length.r === 'centimeters') num *= 160934
    if (length.l === 'miles' && length.r === 'millimeters') num *= 1609344
    if (length.l === 'miles' && length.r === 'yards') num *= 1760

    // Kilometers
    if (length.l === 'kilometers' && length.r === 'miles') num /= 1.60934
    if (length.l === 'kilometers' && length.r === 'meters')  num *= 1000
    if (length.l === 'kilometers' && length.r === 'feet') num *= 3281
    if (length.l === 'kilometers' && length.r === 'inches') num *= 39370
    if (length.l === 'kilometers' && length.r === 'centimeters') num *= 100000
    if (length.l === 'kilometers' && length.r === 'millimeters') num *= 1000000
    if (length.l === 'kilometers' && length.r === 'yards') num *= 1093.61

    // Meters
    if (length.l === 'meters' && length.r === 'miles') num /= 1609
    if (length.l === 'meters' && length.r === 'kilometers')  num /= 1000
    if (length.l === 'meters' && length.r === 'feet') num *= 3.28084
    if (length.l === 'meters' && length.r === 'inches') num *= 39.3701
    if (length.l === 'meters' && length.r === 'centimeters') num *= 100
    if (length.l === 'meters' && length.r === 'millimeters') num *= 1000
    if (length.l === 'meters' && length.r === 'yards') num *= 1.09361

    // Feet
    if (length.l === 'feet' && length.r === 'miles') num /= 5280
    if (length.l === 'feet' && length.r === 'kilometers')  num /= 3281
    if (length.l === 'feet' && length.r === 'meters') num /= 3.281
    if (length.l === 'feet' && length.r === 'inches') num *= 12
    if (length.l === 'feet' && length.r === 'centimeters') num *= 30.48
    if (length.l === 'feet' && length.r === 'millimeters') num *= 304.8
    if (length.l === 'feet' && length.r === 'yards') num /= 3

    // Inches
    if (length.l === 'inches' && length.r === 'miles') num /= 63360
    if (length.l === 'inches' && length.r === 'kilometers')  num /= 39370
    if (length.l === 'inches' && length.r === 'meters') num /= 39.37
    if (length.l === 'inches' && length.r === 'feet') num /= 12
    if (length.l === 'inches' && length.r === 'centimeters') num *= 2.54
    if (length.l === 'inches' && length.r === 'millimeters') num *= 25.4
    if (length.l === 'inches' && length.r === 'yards') num /= 36
    
    // Centimeters
    if (length.l === 'centimeters' && length.r === 'miles') num /= 160934
    if (length.l === 'centimeters' && length.r === 'kilometers')  num /= 100000
    if (length.l === 'centimeters' && length.r === 'meters') num /= 100
    if (length.l === 'centimeters' && length.r === 'feet') num /= 30.48
    if (length.l === 'centimeters' && length.r === 'inches') num /= 2.54
    if (length.l === 'centimeters' && length.r === 'millimeters') num *= 10
    if (length.l === 'centimeters' && length.r === 'yards') num /= 91.44

    // Millimeters
    if (length.l === 'millimeters' && length.r === 'miles') num *= 0.0000062137
    if (length.l === 'millimeters' && length.r === 'kilometers')  num *= 0.000001
    if (length.l === 'millimeters' && length.r === 'meters') num /= 1000
    if (length.l === 'millimeters' && length.r === 'feet') num /= 305
    if (length.l === 'millimeters' && length.r === 'inches') num /= 25.4
    if (length.l === 'millimeters' && length.r === 'centimeters') num /= 10
    if (length.l === 'millimeters' && length.r === 'yards') num /= 914

    // Yards
    if (length.l === 'yards' && length.r === 'miles') num /= 1760
    if (length.l === 'yards' && length.r === 'kilometers')  num /= 1094
    if (length.l === 'yards' && length.r === 'meters') num /= 1.094
    if (length.l === 'yards' && length.r === 'feet') num *= 3
    if (length.l === 'yards' && length.r === 'inches') num *= 36
    if (length.l === 'yards' && length.r === 'centimeters') num *= 91.44
    if (length.l === 'yards' && length.r === 'millimeters') num *= 914.4

    onChangeResult(num)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal 
        transparent={true}
        visible={status.modal}
        style={styles.modal}
        animationType='slide'>
        
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Pressable styles={[styles.lengthButtons, styles.buttonClose]} onPress={() => lengthOnChange('miles')}>
              <Text style={styles.lengthItems}>miles</Text>
            </Pressable>
            
            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('kilometers')}>
              <Text style={styles.lengthItems}>kilometers</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('meters')}>
              <Text style={styles.lengthItems}>meters</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('feet')}>
              <Text style={styles.lengthItems}>feet</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('inches')}>
              <Text style={styles.lengthItems}>inches</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('centimeters')}>
              <Text style={styles.lengthItems}>centimeters</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('millimeters')}>
              <Text style={styles.lengthItems}>millimeters</Text>
            </Pressable>

            <Pressable styles={styles.lengthButtons} onPress={() => lengthOnChange('yards')}>
              <Text style={styles.lengthItems}>yards</Text>
            </Pressable>
          </View>
        </View>

      </Modal>

      <View style={styles.result}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'grey'}}>{result}</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={'height'}
        style={styles.writeTaskWrapper}>

          <View style={styles.lengthWrapper}>
            <TouchableOpacity style={styles.length} onPress={() => setStatus({modal:true, lenDirection:'l'})}>
              <Text style={{color: 'grey', fontWeight: 'bold'}}>{length.l}</Text>
            </TouchableOpacity>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>=</Text>
            <TouchableOpacity style={styles.length} onPress={() => setStatus({modal:true, lenDirection:'r'})}>
              <Text style={{color: 'grey', fontWeight: 'bold'}}>{length.r}</Text>
            </TouchableOpacity>
          </View>

        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          placeholder={"Input here..."}
          onChangeText={text => calculate(text)}
          value={input}
        />
        
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: '80%',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lengthButtons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  lengthItems: {
    fontSize: 20,
    width: 200,
    textAlign: 'center'
  },
  result: {
    padding: 10,
    borderRadius: 5,
    padding: 50,
    minWidth: '80%',
    alignItems: 'center',
    backgroundColor: '#ffff',
    elevation: 5
  },
  lengthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 250,
    marginBottom: 10,
  },
  length: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    margin: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    width: 250,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '95%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffff',
    borderRadius: 15,
    elevation: 2
  },
});
