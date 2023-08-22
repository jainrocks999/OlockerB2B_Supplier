import { View, Text } from 'react-native'
import React,{useState} from 'react'
import InviteretailerModal from '../Modal/inviteRetailer'

export default function index() {
  const [visiable,setVisiable]=useState(true)
  return (
    <View>
     <InviteretailerModal  visi={true}  />
    </View>
  )
}