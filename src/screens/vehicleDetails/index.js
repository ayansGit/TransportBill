import { View, ScrollView, Text } from 'react-native'
import React from 'react'
import Background from '../../components/Background'
import Input from '../../components/Input'
import Button from '../../components/Button'

const VehicleDetails = () => {
  return (
    <Background>
      <ScrollView style={{flex: 1}}>

        <View style={{marginHorizontal: 20}}>

        <Input label='Vehicle Number'/>

        <Input label='RC Number' isNumber/>

        <Input label='Valid upto (YYYY-MM-DD)'/>

        <Button style={{marginTop: 40}} title={'SUBMIT'} />

        </View>

      </ScrollView>
    </Background>
  )
}

export default VehicleDetails