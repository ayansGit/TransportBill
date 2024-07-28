import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {showAlert} from '../../utils';
import {login} from '../../api/auth';
import {screens} from '../../constants';
import {setToken} from '../../utils/storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    console.log('login')
    setLoading(true);
    if (!email) {
      showAlert('Alert', 'Please enter email');
    } else if (!password) {
      showAlert('Alert','Please enter password');
    } else if (password.length <= 5) {
      showAlert('Alert','Please enter password with more than 5 characters');
    } else {
      try {
        await login(email, password);
        setToken('123456');
        navigation.navigate(screens.MAIN);
      } catch (error) {
        showAlert('Error',error?.message);
      }
    }
    setLoading(false);
  };
  return (
    <Background>
      <View style={styles.container}>
        <Input label="Email" value={email} onChangeText={setEmail} />
        <Input
          label="Password"
          isPassword
          value={password}
          onChangeText={setPassword}
        />
        <Button style={styles.button} title={'LOGIN'} isLoading={loading} onPress={onLogin} />
      </View>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  button: {marginTop: 40},
});
