import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Pressable } from 'react-native';

export default Cookie = () => {
  const [open, setOpen] = useState(false); // Estado para controlar se está aberto
  const leftCirclePosition = useRef(new Animated.Value(0)).current; // Posição inicial do semicírculo esquerdo
  const rightCirclePosition = useRef(new Animated.Value(0)).current; // Posição inicial do semicírculo direito
  const textOpacity = useRef(new Animated.Value(0)).current; // Opacidade do texto, inicialmente invisível
  const test = "test";

  const handlePress = () => {
    setOpen(!open);

    // Animação para mover os semicírculos
    Animated.timing(leftCirclePosition, {
      toValue: open ? 0 : -100, // Move para a esquerda (abrir) ou volta para o centro (fechar)
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(rightCirclePosition, {
      toValue: open ? 0 : 100, // Move para a direita (abrir) ou volta para o centro (fechar)
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animação para o texto aparecer quando abrir e desaparecer quando fechar
    Animated.timing(textOpacity, {
      toValue: open ? 0 : 1, // O texto aparece quando os círculos estão abertos
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>

      <Pressable onPress={handlePress} style={styles.touchableArea}>

        <Animated.View
          style={[
            styles.circle,
            styles.leftCircle,
            { transform: [{ translateX: leftCirclePosition }] },
          ]}
        />

    <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          {test}
        </Animated.Text>

        <Animated.View
          style={[
            styles.circle,
            styles.rightCircle,
            { transform: [{ translateX: rightCirclePosition }] },
          ]}
        />


      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "white"
  },
  circle: {
    height: 250,
    width: 125, // Metade do círculo completo
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCircle: {
    borderTopLeftRadius: 125,
    borderBottomLeftRadius: 125,
    borderColor: 'black',
    borderWidth: 4,
    borderRightWidth: 2,
  },
  rightCircle: {
    borderTopRightRadius: 125,
    borderBottomRightRadius: 125,
    borderColor: 'black',
    borderWidth: 4,
    borderLeftWidth: 2,
  },
  touchableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  text: {
    position: 'absolute', // O texto fica "sobreposto" ao círculo
    fontSize: 20,
    color: 'black',
  },
});
