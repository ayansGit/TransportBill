import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import FloatingActionButton from './FloatingActionButton';

const Background = ({children, onAdd}) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.subContainer}>
          {children}
          {onAdd && <FloatingActionButton onPress={onAdd} />}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default React.memo(Background);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
  },
});
