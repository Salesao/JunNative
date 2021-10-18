import React from 'react'
import { Modal, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Gstyle } from '../../styles/style';
import { Form } from './Form';

export const ModalAddPost = ({modalWindow, closeWindow}) => {

    return (
        <Modal visible={modalWindow}>
            <View style={Gstyle.main}>
                <Icon
                name="times-circle"
                size={30}
                color="red"
                onPress={closeWindow}
                style={styles.icon}/>
                <Text style={Gstyle.title}>Форма добавления постов</Text>
                {/* Сама форма добавления постов */}
                <Form closeWindow={closeWindow}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    icon:{
        textAlign:'center',
        marginVertical:20
    }
})
