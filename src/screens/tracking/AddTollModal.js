import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../theme/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';

const AddTollModal = ({visible = false, onClose, onAddTollTax}) => {
  const [isVisbible, setVisibble] = useState(visible);
  const [tollTax, setTollTax] = useState('');

  const handleOnAddTollTax = () => {
    setVisibble(false)
    onAddTollTax && onAddTollTax(tollTax);
  };
  return (
    <Modal visible={visible} transparent>
      <View style={{flex: 1}}>
        <Pressable
          style={{flex: 1, backgroundColor: '#00000085'}}
          onPress={onClose}
        />
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}>
          <View
            style={{
              width: '80%',
              minHeight: 200,
              backgroundColor: 'white',
              elevation: 5,
              shadowColor: colors.black,
              shadowOpacity: 0.1,
              shadowOffset: {height: 0, width: 0},
              borderRadius: 10,
              padding: 20
            }}>
            <Input
              label="Toll Tax"
              placeholder="Enter toll tax"
              isNumber
              onChangeText={setTollTax}
            />

            <Button
              style={{marginTop: 40}}
              title={'SUBMIT'}
              onPress={handleOnAddTollTax}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AddTollModal);

const styles = StyleSheet.create({});
