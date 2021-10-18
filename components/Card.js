import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {ChangePost, changeValuePost, deletePost, RemovePost, SortComment} from '../store/cardSlice';
import { Gstyle } from '../styles/style';
import {Input} from './CastomNativeElements/Input';

export const Card = ({title, body, id, nav}) => {
  const dispatch = useDispatch();

  const [change, setChange] = useState(false);
  const [valueBody, setValueBody] = useState('');
  const [valueTitle, setValueTitle] = useState('');

  const changeState = () => {
    setValueTitle(title);
    setValueBody(body);
  }

  const changeHandlerPost = () => {
    setChange(!change);
    !change
    ?changeState()
    :dispatch(changeValuePost({id, title: valueTitle, body: valueBody}));
  }

  return (
    <View style={styles.item}>
      {/* инпуты для просмотра и редактирования поста */}
          <Input
            edit={change}
            value={!change?title:valueTitle}
            changeValue={setValueTitle}
            placeholder="Введите название поста"
          />
          <Input
            edit={change}
            value={!change?body:valueBody}
            changeValue={setValueBody}
            placeholder="Введите описание поста"
          />
      {/* Кнопка удаления и кнопка открытия поста */}
      {!change && <View style={Gstyle.buttons}>
        <Button title="Открыть Пост" onPress={() => {
          nav()
        }} />
        <Button
          color="red"
          title="Удалить"
          onPress={() => {
            dispatch(deletePost(id))
          }}
        />
      </View>
      }
      {/* Кнопка редактирования поста */}
      <Button
        title={!change ? 'Редактировать' : 'Сохранить'}
        color={!change ? 'silver' : 'green'}
        onPress={changeHandlerPost}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    marginBottom: 30,
    borderWidth: 2,
    padding: 15,
    marginTop: 15,
  },
});
