import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {screens} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../theme/colors';

const TollDetail = ({navigation, route}) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [ticketAmount, setTicketAmount] = useState('0');
  const [ticketNumber, setTicketNumber] = useState('');
  const [journeyTypes, setJourneyTypes] = useState([
    {label: 'Single Journey', value: 'S'},
    {label: 'Double Journey', value: 'R'},
  ]);
  const [journeyType, setJourneyType] = useState('S');
  const [lane, setLane] = useState('');
  const [overWeightCharge, setOverWeightCharge] = useState('0');
  const [nonFastagPenalty, setNonFastagePenalty] = useState('0');

  const createBill = () => {
    const bill = {
      companyName: companyName,
      companyAddress: companyAddress,
      ticketAmount: ticketAmount,
      ticketNumber: ticketNumber,
      journeyType: journeyType,
      overWeightCharge: overWeightCharge,
      nonFastagPenalty: nonFastagPenalty,
      lane: lane,
      ...route.params.toll,
    };
    navigation.navigate(screens.PREVIE_BILL, bill);
  };
  return (
    <Background>
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Input
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            onChangeText={setCompanyName}
          />

          <Input
            label="Company Address"
            placeholder="Enter company address"
            value={companyAddress}
            onChangeText={setCompanyAddress}
          />

          <Input
            label="Ticket Amount (₹)"
            placeholder="Enter ticket amount"
            isNumber
            value={ticketAmount}
            onChangeText={setTicketAmount}
          />

          <Input
            label="Ticket Number"
            placeholder="Enter ticket number"
            value={ticketNumber}
            onChangeText={setTicketNumber}
          />

          {/* <Input
            label="Over weight charge (₹)"
            placeholder="Enter over weight charge"
            isNumber
            value={overWeightCharge}
            onChangeText={setOverWeightCharge}
          /> */}

          <Input
            label="Non-Fastag Penalty (₹)"
            placeholder="Enter Non-Fastag Penalty"
            value={nonFastagPenalty}
            onChangeText={setNonFastagePenalty}
          />

          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginTop: 20,
            }}>
            Journey type
          </Text>

          <Dropdown
            style={{
              height: 50,
              borderColor: colors.lightGrey,
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: 10,
            }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={journeyType}
            data={journeyTypes}
            onChange={item => {
              setJourneyType(item.value);
            }}
          />

          <Input
            label="Lane"
            placeholder="Enter Lane"
            value={lane}
            isNumber
            onChangeText={setLane}
          />

          <Button
            style={{marginTop: 40}}
            title={'CREATE BILL'}
            onPress={createBill}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default TollDetail;

const styles = StyleSheet.create({});
