import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';

export default Cookie = () => {
  const [open, setOpen] = useState(false); // Estado para controlar se o biscoito está aberto
  const [fraseAtual, setFraseAtual] = useState(''); // Estado para armazenar a frase atual
  const leftCirclePosition = useRef(new Animated.Value(0)).current; // Posição inicial do semicírculo esquerdo
  const rightCirclePosition = useRef(new Animated.Value(0)).current; // Posição inicial do semicírculo direito
  const textOpacity = useRef(new Animated.Value(0)).current; // Opacidade do texto, inicialmente invisível

  const frases = [
    'Siga os bons e aprenda com eles.', 
    'O bom-senso vale mais do que muito conhecimento.', 
    'O riso é a menor distância entre duas pessoas.', 
    'Deixe de lado as preocupações e seja feliz.',
    'Realize o óbvio, pense no improvável e conquiste o impossível.',
    'Acredite em milagres, mas não dependa deles.',
    'A maior barreira para o sucesso é o medo do fracasso.'
  ];

  // Função para gerar um número aleatório
  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * frases.length);
  }

  const handlePress = () => {
    // Gera uma nova frase apenas se o biscoito estiver sendo aberto
    if (!open) {
      const novaFrase = frases[gerarNumeroAleatorio()];
      setFraseAtual(novaFrase);
    }

    setOpen(!open);

    // Animação para mover os semicírculos
    Animated.timing(leftCirclePosition, {
      toValue: open ? 0 : -150, // Move para a esquerda (abrir) ou volta para o centro (fechar)
      duration: 900,
      useNativeDriver: false,
    }).start();

    Animated.timing(rightCirclePosition, {
      toValue: open ? 0 : 150, // Move para a direita (abrir) ou volta para o centro (fechar)
      duration: 900,
      useNativeDriver: false,
    }).start();

    // Animação para o texto aparecer quando abrir e desaparecer quando fechar
    Animated.timing(textOpacity, {
      toValue: open ? 0 : 1, // O texto aparece quando os círculos estão abertos
      duration: 800,
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
          {fraseAtual}
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
    backgroundColor: "white"
  },
  rightCircle: {
    borderTopRightRadius: 125,
    borderBottomRightRadius: 125,
    borderColor: 'black',
    borderWidth: 4,
    borderLeftWidth: 2,
    backgroundColor: "white"
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
    width: 250,
    textAlign: 'center',
    zIndex: -1
  },
});
