import React, { useState } from 'react'
import { TextInput, View, Button, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { AddComment, addNewComment } from '../../../store/cardSlice'
import { Gstyle } from '../../../styles/style'

export const InputAddComment = ({postId}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    return (
        <View style={{marginBottom: 30}}>
          <TextInput
            style={Gstyle.input}
            value={value}
            onChangeText={setValue}
          />
          <Button
            title="Добавить комментарий"
            onPress={() => {
              if (!value.trim()){
                Alert.alert('Комментарий должен быть заполнен')
              }
              else{
                const comment = {
                  id: Date.now().toString(),
                  postId,
                  text: value,
                };
                dispatch(addNewComment(comment))
                setValue('')
                Alert.alert('Ура!!!Вы добавили комментарий. Нажмите на плюсик')
              }
            }}
          />
        </View>
    )
}
