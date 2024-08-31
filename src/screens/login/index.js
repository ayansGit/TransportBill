import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {showAlert} from '../../utils';
import {login} from '../../api/auth';
import {screens} from '../../constants';
import {
  setToken,
  setUserId,
  setUserType,
  setVehicle,
} from '../../utils/storage';
import {colors} from '../../theme/colors';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('admin');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    console.log('login');
    setLoading(true);
    if (!email) {
      showAlert('Alert', 'Please enter email');
    } else if (!password) {
      showAlert('Alert', 'Please enter password');
    } else if (password.length <= 5) {
      showAlert('Alert', 'Please enter password with more than 5 characters');
    } else {
      try {
        let response = await login(email, password, type);
        console.log('login resp', JSON.stringify(response));
        if (response.success) {
          setUserId(response.data.user_id);
          setToken(response.token);
          setUserType(response.data.type);
          if (response.data.type === 'admin') {
            navigation.replace(screens.MAIN);
          } else {
            setVehicle(response.data.vehicle_id);
            navigation.replace(screens.MAIN_DRIVER);
          }
        }
      } catch (error) {
        showAlert('Error', error?.message);
      }
    }
    setLoading(false);
  };
  return (
    <Background>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: '30%',
              paddingVertical: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.main,
              backgroundColor: type === 'admin' ? colors.main : colors.white,
              marginHorizontal: 10,
            }}
            onPress={() => setType('admin')}>
            <Text
              style={{
                fontSize: 14,
                alignSelf: 'center',
                color: type === 'admin' ? colors.white : colors.main,
              }}>
              ADMIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              paddingVertical: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.main,
              backgroundColor: type === 'driver' ? colors.main : colors.white,
              marginHorizontal: 10,
            }}
            onPress={() => setType('driver')}>
            <Text
              style={{
                fontSize: 14,
                alignSelf: 'center',
                color: type === 'driver' ? colors.white : colors.main,
              }}>
              DRIVER
            </Text>
          </TouchableOpacity>
        </View>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          isPassword
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style={styles.button}
          title={'LOGIN'}
          isLoading={loading}
          onPress={onLogin}
        />
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
