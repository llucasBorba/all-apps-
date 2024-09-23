import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Counter() {

  const [count, setCount] = useState(0);
  const rotation = useRef(new Animated.Value(0.5)).current; 

  const startRotation = () => {
    Animated.timing(rotation, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0.5);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = { transform: [{ rotate: rotateInterpolate }],
  };

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    count == 0 ? '' : setCount(count - 1);
  }

  const reset = () => {
   setCount(0);
  }


  return (

    // <View style={styles.container}>
    //  <Text>{count}</Text>
    // <Text onPress={increment}> Increment</Text>
    // <Text onPress={decrement}> Decrement</Text>
    // </View>

    
    <View style={styles.container}>

      <Text style={styles.number}>{count}</Text>

     <View style={styles.invisibleButton}>
      <Pressable onPress={decrement} style={styles.screenBtn}></Pressable>
      <Pressable onPress={increment} style={styles.screenBtn}></Pressable>
     </View>

     <Pressable style={styles.button}  onPress={() => {
          reset(); // Atualiza a citação
          startRotation(); // Inicia a rotação
        }}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="sync" size={60} color={"black"} />
        </Animated.View>
      </Pressable>

      {/* <View style={styles.counter}>
  
        <Pressable onPress={decrement} style={styles.button} >
          <Text> Decrement</Text>
        </Pressable>

        <Pressable onPress={increment} style={styles.button} >
          <Text>Increment</Text>
        </Pressable>
  
      </View> */}

      {/* <LottieView
        source={require("/Users/lucasborba/animation-test/assets/Animation - 1726541559589.json")}
        style={styles.animationContainer}
        autoPlay
        loop
      /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: "40%",
    height: "40%"
  },
  counter: {
    flexDirection: "row",
    //gap: "15px"
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
  },
  number: { 
    fontSize: 300
  },
  invisibleButton: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  screenBtn: {
    flex: 1
  }
});
