import { Formik } from 'formik'
import React from 'react'
import { Alert, Button, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addNewPost, AddPost } from '../../store/cardSlice'
import { Gstyle } from '../../styles/style'
import { Input } from '../CastomNativeElements/Input'

export const Form = ({closeWindow}) => {

    const dispatch = useDispatch()

    const Values = {
        id:Date.now().toString(),
        title:'',
        body:''
    }

    return (
        <View style={Gstyle.main}>
            <Formik initialValues={Values} onSubmit={(values, {resetForm}) => {
                if(!values.body.trim() || !values.title.trim()){
                    Alert.alert('Поля должны быть заполнены')
                }else{
                    dispatch(addNewPost(values))
                    resetForm()
                    closeWindow()
                }
            }}>
                {({values, handleChange, handleSubmit}) => (
                <>
                    <Input
                    value={values.title}
                    changeValue={handleChange('title')}
                    placeholder="Введите название поста"
                    />
                    <Input
                    value={values.body}
                    changeValue={handleChange('body')}
                    placeholder="Введите описание поста"
                    />
                    <Button title="Добавить" color="green" onPress={handleSubmit}/>
                </>
                )}
            </Formik>
        </View>
    )
}