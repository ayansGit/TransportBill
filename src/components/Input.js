import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const Input = ({
  width = '100%',
  height = 40,
  placeholder = 'Input',
  label = 'Input',
  marginTop = 20,
  countryCode = '+91',
  isPhone = false,
  isEmail = false,
  isPassword = false,
  isNumber = false,
  multiline = false,
  maxLength = null,
  value,
  disable = false,
  islableShown = true,
  onChangeText,
}) => {
  const onTextChange = text => {
    if (onChangeText) onChangeText(text);
  };

  return (
    <View style={{width: width, marginTop: marginTop}}>
      {islableShown && (
        <Text
          style={{
            fontSize: 14,
            color: colors.text,
          }}>
          {label}
        </Text>
      )}

      <View
        style={{
          width: '100%',
          height: height,
          flexDirection: 'row',
          borderRadius: 5,
          alignItems: 'center',
          borderColor: colors.lightGrey,
          borderWidth: 1,
          marginTop: 10,
        }}>
        {isPhone && (
          <TouchableOpacity style={{minWidth: 40, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
              }}>
              {countryCode}
            </Text>
          </TouchableOpacity>
        )}

        {isPhone && (
          <View
            style={{
              height: 20,
              width: 1,
              backgroundColor: colors.black,
            }}
          />
        )}

        <TextInput
          editable={!disable}
          style={[
            {
              fontSize: 14,
              color: colors.text,
              marginLeft: 10,
              flexGrow: 1,
            },
            {
              textAlignVertical: multiline ? 'top' : undefined,
              height: multiline ? '100%' : undefined,
            },
          ]}
          multiline={multiline}
          placeholder={placeholder}
          inputMode={isPhone || isNumber ? 'numeric' : 'text'}
          keyboardType={
            isPhone || isNumber
              ? 'numeric'
              : isEmail
              ? 'email-address'
              : 'default'
          }
          returnKeyType={multiline ? 'default' : 'done'}
          secureTextEntry={isPassword}
          value={value}
          onChangeText={onTextChange}
          maxLength={isPhone ? 10 : maxLength}
        />
      </View>
    </View>
  );
};

export default React.memo(Input);