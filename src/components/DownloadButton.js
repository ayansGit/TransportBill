import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const DownloadButton = ({style, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.title, style]}>Download</Text>
    </TouchableOpacity>
  );
};

export default React.memo(DownloadButton);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginVertical: 10,
    marginTop: 15,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.main,
  },
  title: {fontSize: 14, fontWeight: 'bold', color: colors.main},
});
