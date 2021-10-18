import React, { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {ModalAddPost} from './CreatePost/ModalAddPost';
import {Gstyle} from '../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, PostState} from '../store/cardSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Main = ({navigation}) => {
  const [modalWindow, setModalWindow] = useState(false);
  const {posts, status, error} = useSelector(PostState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  },[dispatch])

  return (
    <View style={Gstyle.main}>
      {/* Форма добавления постов */}
      <ModalAddPost
      modalWindow={modalWindow}
      closeWindow={() => setModalWindow(false)}
      />
      <Icon
        name="plus-circle"
        size={30}
        color="green"
        onPress={() => setModalWindow(true)}
        style={{textAlign: 'center'}}
      />
      <Text style={Gstyle.title}>Главная страница</Text>
      {status === 'rejected' && <Text>{error}</Text>}
      {status === 'loading'
      ?<ActivityIndicator size="large"/>
      :
      // Список постов
      <KeyboardAwareScrollView>
      {!posts.length && <Text style={Gstyle.title}>Постов нет</Text>}
      <FlatList
        data={posts}
        renderItem={({item}) => (
            <Card nav={() => navigation.navigate('InfoPost', item)}
            {...item}/>
        )}
        keyExtractor={item => item.id}
      />
      </KeyboardAwareScrollView>
        }
    </View>
  );
};
