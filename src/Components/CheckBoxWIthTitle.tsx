import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import imagePath from '../constants/imagePath'
import { moderateScale } from 'react-native-size-matters'
import { textScale } from '../styles/responsiveSize'
import fontFamily from '../styles/fontFamily'
import colors from '../styles/colors'
interface Proptypes{
title:String,
isChecked:Boolean,
oncheck:() => void
}
const CheckBoxWIthTitle:FC<Proptypes> = ({title,isChecked,oncheck}:Proptypes) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',marginBottom:moderateScale(8),justifyContent:'space-between'}}>
     <Text  style={{fontSize:textScale(14),fontFamily:fontFamily.ProximaNovaRegular,color:colors.black}}>{title}</Text>
     <TouchableOpacity onPress={oncheck}>
     <Image source={ isChecked ? imagePath.ic_checked : imagePath.ic_unchecked}/>
        </TouchableOpacity>
    </View>
  )
}

export default CheckBoxWIthTitle