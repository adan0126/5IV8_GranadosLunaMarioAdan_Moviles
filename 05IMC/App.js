import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState(null);

  const calcularIMC = () => {
    if (!peso || !altura) {
      setMensaje('Por favor ingresa peso y altura');
      setResultado(null);
      setImagen(null);
      return;
    }

    const imc = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
    setResultado(imc.toFixed(2));

    if (imc < 18.5) {
      setMensaje('Bajo peso 😕');
      setImagen('https://st3.depositphotos.com/8776448/19106/v/950/depositphotos_191068344-stock-illustration-cartoon-underweight-woman.jpg');
    } else if (imc < 24.9) {
      setMensaje('Peso normal 😊');
      setImagen('https://manmedicalinstitute.com/wp-content/uploads/2021/03/peso-ideal-hombre.jpg');
    } else if (imc < 29.9) {
      setMensaje('Sobrepeso 😐');
      setImagen('https://www.gaceta.unam.mx/wp-content/uploads/2025/08/250811-aca1-des-f1-Sobrepeso-y-obesidad-impactan-el-cerebro-de-los-infantes.jpg');
    } else {
      setMensaje('Obesidad 😟');
      setImagen('https://economiadelasalud.com/wp-content/uploads/2022/04/obesidad-infantil-643077170.jpg');
    }
  };

  const limpiarCampos = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
    setMensaje('');
    setImagen(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limpiarCampos}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Tu IMC es: {resultado}</Text>
          <Text style={styles.resultMessage}>{mensaje}</Text>

          {imagen && (
            <Image
              source={{ uri: imagen }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: '#5A8DEE',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  resultMessage: {
    fontSize: 18,
    marginTop: 5,
    color: '#666',
  },
  image: {
    width: 250,
    height: 160,
    marginTop: 15,
    borderRadius: 10,
  },
});
