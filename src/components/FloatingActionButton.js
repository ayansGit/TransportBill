import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icons} from '../assets';
import {colors} from '../theme/colors';

const FloatingActionButton = ({onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icons.Add color={colors.white}/>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.main,
    elevation: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20
  },
});
