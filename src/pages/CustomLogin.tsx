import React, {Fragment, useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth0, Credentials, LoginOtpParameters} from 'react-native-auth0';
import Header from '../components/Header';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '@react-navigation/native';
import config from '../auth0-configuration';

export default function CustomLogin(): React.JSX.Element {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {user, clearCredentials, authorizeWithOTP, isLoading, error} =
    useAuth0();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mfaToken, setMfaToken] = useState<string>();
  const [userOtpCode, setUserOtpCode] = useState<string>();
  const [customError, setCustomError] = useState<Error>();

  const loggedIn = user !== undefined && user !== null;

  const onLogin = async () => {
    await fetch(`https://${config.domain}/oauth/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: config.clientId,
        username: email,
        password: password,
        client_secret: config.clientSecret,
        audience: config.audience,
        grant_type: 'password',
        scope: 'openid profile email',
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Paso 1 - Inicio de sesión:', data);
        if (data.error === 'mfa_required') {
          setMfaToken(data.mfa_token);
          setCustomError(undefined);
          retrieveEnrolledAuthenticators(data.mfa_token);
        }
        if (
          data.error === 'invalid_grant' ||
          data.error === 'invalid_request'
        ) {
          setCustomError(new Error(data.error_description));
        }
      })
      .catch(err => {
        console.error('Error', err);
      });
  };

  function retrieveEnrolledAuthenticators(token: string) {
    fetch(`https://${config.domain}/mfa/authenticators`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(
          'Paso 2 - Listar métodos de autentificación adicionales:',
          data,
        );
        if (data.error) {
          console.error(
            'Error listando métodos de autentificación adicionales',
            data,
          );
        } else {
          console.log('Ingresá el código MFA enviado');
        }
      })
      .catch(err => {
        console.error(err);
        setPassword('');
        setMfaToken('');
        setUserOtpCode('');
      });
  }

  const onLoginWithOTPCredentials = async () => {
    const options: LoginOtpParameters = {
      otp: userOtpCode!,
      mfaToken: mfaToken!,
      audience: config.audience,
    };
    console.log(options);
    await authorizeWithOTP(options)
      .then((data?: Credentials) => {
        if (data) {
          Alert.alert('Inicio de sesión correcto', data.accessToken);
          navigation.navigate('Home' as never);
        } else {
          console.log(data);
          setPassword('');
          setMfaToken('');
          setUserOtpCode('');
          Alert.alert(
            'Ocurrió un error',
            'No se pudieron validar las credenciales',
          );
        }
      })
      .catch(err => {
        console.error('Error', err);
      });
  };

  const onLogout = async () => {
    await clearCredentials();
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
        title={
          loggedIn
            ? `Hola ${user.name}!`
            : mfaToken
            ? 'Ingresá el código de validación'
            : 'Ingresá tus credenciales'
        }
        showBackButton={true}
      />
      <SafeAreaView
        edges={['left', 'right']}
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <View style={styles.loginContainer}>
            {!loggedIn && !mfaToken && (
              <Fragment>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: (colors as any).backgroundInverted,
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Correo electrónico"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: (colors as any).backgroundInverted,
                    },
                  ]}
                  placeholder="Contraseña"
                  textContentType="password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </Fragment>
            )}
            {mfaToken && (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: (colors as any).backgroundInverted,
                  },
                ]}
                value={userOtpCode}
                onChangeText={setUserOtpCode}
                placeholder="Código OTP"
                textContentType="oneTimeCode"
                keyboardType="numeric"
              />
            )}
            <Button
              onPress={
                loggedIn
                  ? onLogout
                  : mfaToken
                  ? onLoginWithOTPCredentials
                  : onLogin
              }
              text={
                loggedIn
                  ? 'Cerrar sesión'
                  : mfaToken
                  ? 'Confirmar código'
                  : 'Iniciar sesión'
              }
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
            {customError && (
              <Text style={styles.error}>{customError.message}</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: Platform.OS === 'ios' ? 10 : 5,
    width: '100%',
    gap: 10,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: Platform.OS === 'ios' ? 10 : 7.5,
    gap: 10,
    justifyContent: 'center',
  },
  error: {
    margin: 10,
    textAlign: 'center',
    color: '#d8000c',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
