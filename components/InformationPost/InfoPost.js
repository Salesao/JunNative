import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {fetchComments, PostState} from '../../store/cardSlice';
import {Gstyle} from '../../styles/style';
import {Comments} from './Comments/Comments';
import {InputAddComment} from './Comments/InputAddComment';
import { TitleComments } from './Comments/TitleComments';

export const InfoPost = ({route}) => {
  const [showComment, setShowComment] = useState(false);
  const {sortedComment, status, error} = useSelector(PostState);
  // переданные параметры из поста, на который кликнули
  const {title, body, id} = route.params;

  const dispatch = useDispatch()

  useEffect(() => {
    // загрузка и фильтрация комментариев
    dispatch(fetchComments(id))
  }, [dispatch])

  return (
    <>
      <View style={Gstyle.main}>
        <View style={styles.post}>
          {/* Информация нажного поста */}
          <Text style={Gstyle.title}>{title}</Text>
          <Text style={styles.full}>{body}</Text>
        </View>
        {status === 'rejected' && <Text>{error}</Text>}
        {status === 'loading'
        ?
        <ActivityIndicator size="large"/>
        :
        <>
        {/* Заголовок для просмотра постов */}
        <TitleComments 
        showComment={showComment} 
        setShowComment={() => setShowComment(!showComment)}
        sortedComment={sortedComment}
        />
        {/* Список комментариев к посту */}
        {showComment && (
        <KeyboardAwareScrollView>

          <FlatList
            data={sortedComment}
            renderItem={({item}) => (
              <Comments {...item} />
              )}
              keyExtractor={item => item.id}
              />
        </KeyboardAwareScrollView>
        )}
        {/* инпут для добовления поста */}
        {!showComment && <InputAddComment postId={id} />}
        </>
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  full: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  comment: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15,
    opacity: 1,
    color: 'black',
  },
  post: {
    borderWidth: 2,
  },
  hr: {
    borderColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
