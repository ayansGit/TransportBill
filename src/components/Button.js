import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const Button = ({title, style, isLoading, disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={isLoading || disabled}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={{fontSize: 12, fontWeight: 'bold', color: colors.white}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.main,
    elevation: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
