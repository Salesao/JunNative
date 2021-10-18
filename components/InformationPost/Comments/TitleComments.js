import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import { Gstyle } from '../../../styles/style'

export const TitleComments = ({showComment, setShowComment, sortedComment}) => {
    return (
        <>
        <View
        style={styles.commentAndIcon}>
        <Text style={Gstyle.title}>Комментарии</Text>
        <Icon
          name={showComment ? 'minus' : 'plus'}
          size={40}
          color={showComment ? 'red' : 'green'}
          onPress={setShowComment}
        />
      </View>
      {!sortedComment.length && showComment && (
        <Text style={styles.commentNothing}>Комментариев пока нет</Text>
      )}
      </>
    )
}

const styles = StyleSheet.create({
    commentNothing:{
        fontSize:25,
        textAlign:'center',
        marginTop:15,
        color:'red',
        fontWeight:"500"
    },
    commentAndIcon:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})