import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ChangeComment, changeValueComment, deleteComment, RemoveComment} from '../../../store/cardSlice';
import {Input} from '../../CastomNativeElements/Input';

export const Comments = ({text, id}) => {
  const [flag, setFlag] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleChangeComment = () => {
    if (!comment.trim()) {
      Alert.alert('Комментарий не может быть пустым');
    } else {
      dispatch(changeValueComment({id, text: comment}));
      setFlag(false);
    }
  }

  return (
    <View style={styles.comment}>
      {!flag ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <Input
          value={comment}
          changeValue={setComment}
          placeholder="Напишите сюда комментарий"
        />
      )}
      <View style={styles.buttons}>
        <Button
          title={!flag ? 'Редактировать' : 'Сохранить'}
          color={!flag ? 'silver' : 'green'}
          onPress={() => {
            if (!flag) {
              setFlag(true);
              setComment(text);
            } else {
              handleChangeComment()
            }
          }}
        />
        <Button
          title={!flag ? 'Удалить' : 'Отменить'}
          color="red"
          onPress={() => {
            !flag ? dispatch(deleteComment(id)) : setFlag(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    width:"100%"
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"space-around",
  },
  comment:{
    borderWidth:1,
    borderRadius:15,
    padding:30,
    marginTop:15,
  },
  text:{
    textAlign:'center',
    fontSize:25,
    marginBottom:20
  }
});
