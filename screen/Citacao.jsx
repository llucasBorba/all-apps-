
import { Pressable, StyleSheet, Text, View, Animated} from 'react-native';
import ConsumirApi from '../service/ConsumirApi';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Traduzir from '../service/Traduzir';


export default function Citacao() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const rotation = useRef(new Animated.Value(0)).current; 

  const fetchQuote = async () => {
    try {
      const response = await ConsumirApi("https://stoic.tekloon.net/stoic-quote");
      const originalQuote = response.data.quote;

      if(!response.data.author){
        setAuthor("Desconhecido");
      }else setAuthor(response.data.author);
      
     // const translatedQuote = await Traduzir(originalQuote, apiKey);
      setQuote(originalQuote);
      
    } catch (error) {
      console.error(error);
    }
  };

  const startRotation = () => {
    Animated.timing(rotation, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };


  useEffect(() => {
    fetchQuote();
  }, []);



  return (
    <View style={styles.container}>

    <View style={styles.citacao}>
      <Text style={styles.title}>"{quote}"</Text>
      <Text style={styles.title}> - {author}</Text>
    </View>
    
    <Pressable style={styles.button}  onPress={() => {
          fetchQuote(); // Atualiza a citação
          startRotation(); // Inicia a rotação
        }}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="sync" size={44} color={"black"} />
        </Animated.View>
      </Pressable>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold',
    
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: "absolute",
    bottom: 0,
    margin: 80
  },
  citacao: { 
    position: "absolute",
    margin: 50,
    gap: 30,
    
  }
});
