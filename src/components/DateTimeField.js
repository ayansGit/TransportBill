import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {colors} from '../theme/colors';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const DateTimeField = ({
  width = '100%',
  height = 40,
  marginTop = 20,
  label,
  placeholder,
  format = 'yyyy-MM-DD',
  onChange,
}) => {
  const [dateTime, setDateTime] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleOnDateTimeChange = date => {
    console.log('handleOnDateTimeChange', date);
    setDateTime(date);
    onChange && onChange(moment(new Date(date)).format(format));
  };

  const parsedDateTime = useMemo(
    () => moment(new Date(dateTime)).format('yyyy-MM-DD'),
    [dateTime],
  );

  return (
    <View style={{width: width, marginTop: marginTop}}>
      <Text
        style={{
          fontSize: 14,
          color: colors.text,
        }}>
        {label}
      </Text>
      <TouchableOpacity
        style={{
          width: '100%',
          height: height,
          flexDirection: 'row',
          borderRadius: 5,
          alignItems: 'center',
          borderColor: colors.lightGrey,
          borderWidth: 1,
          marginTop: 10,
          paddingHorizontal: 10,
        }}
        onPress={() => setIsOpen(true)}>
        <Text
          style={{
            fontSize: 14,
            color: dateTime ? colors.text : colors.textLight,
          }}>
          {dateTime ? `${parsedDateTime}` : placeholder}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={isOpen}
        mode="date"
        date={dateTime ? dateTime : new Date()}
        onConfirm={date => {
          setIsOpen(false);
          handleOnDateTimeChange(date);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
    </View>
  );
};

export default DateTimeField;

const styles = StyleSheet.create({});
