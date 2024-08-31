import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

const TollDetail = ({navigation, route}) => {
  const [companyName, setCompanyName] = useState('');
  const [ticketAmount, setTicketAmount] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [journeyType, setJourneyType] = useState('');

  const createBill = () => {};
  return (
    <Background>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Input
          label="Company Name"
          placeholder="Enter company name"
          value={companyName}
          onChangeText={setCompanyName}
        />

        <Input
          label="Ticket Amount"
          placeholder="Enter ticket amount"
          value={ticketAmount}
          onChangeText={setTicketAmount}
        />

        <Input
          label="Ticket Number"
          placeholder="Enter ticket number"
          value={ticketNumber}
          onChangeText={setTicketNumber}
        />

        <Input
          label="Journey Type"
          placeholder="Enter journey type (Single/Double)"
          value={journeyType}
          onChangeText={setJourneyType}
        />

        <Button
          style={{marginTop: 40}}
          title={'CREATE BILL'}
          onPress={createBill}
        />
      </View>
    </Background>
  );
};

export default TollDetail;

const styles = StyleSheet.create({});
