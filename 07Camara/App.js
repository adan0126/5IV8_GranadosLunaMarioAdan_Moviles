import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import {
  Button,
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Necesitas permitir acceso a la cámara</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={requestPermission}>
          <Text style={styles.buttonText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const sharePhoto = async () => {
    if (photo) await Sharing.shareAsync(photo);
  };

const handleLogin = () => {
  alert(`Usuario: ${username}\nContraseña: ${password}`);
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.containerCard}>

          <Text style={styles.title}>Iniciar sesión</Text>

          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity style={styles.buttonSecondary} onPress={() => setPhoto(null)}>
                <Text style={styles.buttonText}>Tomar otra</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonPrimary} onPress={sharePhoto}>
                <Text style={styles.buttonText}>Compartir foto</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <CameraView ref={cameraRef} style={styles.camera} />
              <TouchableOpacity style={styles.buttonPrimary} onPress={takePhoto}>
                <Text style={styles.buttonText}>Tomar foto</Text>
              </TouchableOpacity>
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FAE8D9', // Crema cálido
  },

  containerCard: {
    backgroundColor: '#FFF7F0', // Crema suave
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A14A28', // Terracota oscuro
    textAlign: 'center',
    marginBottom: 25,
  },

  center: {
    flex: 1,
    backgroundColor: '#FAE8D9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#A14A28',
    textAlign: 'center',
  },

  camera: {
    height: 250,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E6A57E', // Terracota claro
  },

  photo: {
    height: 250,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E6A57E',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D7CCC8', // Gris cálido
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#5D4037', // Café oscuro
  },

  buttonPrimary: {
    backgroundColor: '#D98247', // Naranja cálido suave
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  buttonSecondary: {
    backgroundColor: '#8D6E63', // Café arena
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
