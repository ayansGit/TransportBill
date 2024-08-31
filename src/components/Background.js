import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import FloatingActionButton from './FloatingActionButton';

const Background = ({children, loading, onAdd}) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={styles.subContainer}>
            {children}
            {onAdd && <FloatingActionButton onPress={onAdd} />}
          </View>
        )}
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
