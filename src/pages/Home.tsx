import React, {Fragment} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAuth0, Credentials} from 'react-native-auth0';
import Header from '../components/Header';
import Card from '../components/Card';
import {useNavigation, useTheme} from '@react-navigation/core';
import WorldCodeIcon from '../icons/WorldCode.svg';
import CodeIcon from '../icons/Code.svg';

export default function Home(): React.JSX.Element {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {authorize, clearSession, user, error, isLoading} = useAuth0();

  const onLogin = async () => {
    await authorize({}, {})
      .then((data?: Credentials) => {
        if (data) {
          Alert.alert('Inicio de sesión correcto', data.accessToken);
        } else {
          Alert.alert(
            'Ocurrió un error',
            'No se pudieron validar las credenciales',
          );
        }
      })
      .catch(err => {
        console.error('Error', err);
      });

    // * Se podría implementar getCredentials()
    // * en lugar de usar el callback de authorize
    //
    // const credentials = await authorize({}, {});
    // Alert.alert('Inicio de sesión correcto', credentials.accessToken);
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    await clearSession({}, {});
  };

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text>Cargando</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <Header
        title={loggedIn ? `Hola ${user.name}!` : 'Iniciar sesión con Auth0'}
      />
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[styles.container, {backgroundColor: colors.background}]}>
            <Card
              title="Ventana universal"
              subtitle="Utilizar la ventana universal integrada de Auth0 para iniciar o cerrar una sesión"
              icon={WorldCodeIcon}
              onPress={loggedIn ? onLogout : onLogin}
            />
            <Card
              title="Integración manual"
              subtitle="Ir a la pantalla de inicio de sesión personalizada para utilizar una integración de la API de Auth0"
              icon={CodeIcon}
              onPress={() => {
                navigation.navigate('Login' as never);
              }}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 10 : 5,
    width: '100%',
    gap: 10,
  },
  headerSafeAreaView: {
    flex: 0,
    backgroundColor: '#0b0809',
  },
  error: {
    margin: 10,
    textAlign: 'center',
    color: '#d8000c',
  },
});
