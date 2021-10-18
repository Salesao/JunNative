import React from 'react'
import { TextInput } from 'react-native'
import { Gstyle } from '../../styles/style'

export const Input = ({value, changeValue, placeholder, edit = true}) => {
    return (
                <TextInput
                  editable={edit}
                  style={edit?Gstyle.input:Gstyle.titleText}
                  value={value}
                  placeholder={placeholder}
                  onChangeText={changeValue}
                />
    )
}
