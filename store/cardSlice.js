import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//ссылки на данные с сервера
const uriComments = 'https://my-json-server.typicode.com/Salesao/FakeJson/comments/'
const uriPosts = 'https://my-json-server.typicode.com/Salesao/FakeJson/posts/'

//методы для получения постов и комментарие
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function(_,{rejectWithValue}){
    try{
      const response = await fetch(uriPosts)
      if(!response.ok){
        throw new Error('Server Error')
      }
      const data = await response.json()
      return data
    }catch(e){
      //записывает ошибку в action
      return rejectWithValue(e.message)
    }
  }
)

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async function (id,{rejectWithValue, dispatch}){
    try{
      const response = await fetch(uriComments)
      if(!response.ok){
        throw new Error ("Server Error. Couldn't load comments")
      }
      const data = await response.json()
      dispatch(SortComment({id, comments: data}))


    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

//реализация удаления через сервер для постов и комментариев
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async function(id,{rejectWithValue, dispatch}){
    try{

      const response = await fetch(uriPosts + id,{
        method:'DELETE'
      })
      if(!response.ok){
        dispatch(RemovePost(id))
        throw new Error('Ошибка.Данные не находяться на сервере, удаление только на фронтэнде')
      }
      dispatch(RemovePost(id))


    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async function(id,{rejectWithValue, dispatch}){
    try{

      const response = await fetch(uriComments + id,{
        method:'DELETE'
      })
      console.log(response.ok);
      if(!response.ok){
        dispatch(RemoveComment(id))
        throw new Error('Ошибка.Данные не находяться на сервере, удаление только на фронтэнде')
      }
      dispatch(RemoveComment(id))


    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

// добавление постов и комментариев
export const addNewPost = createAsyncThunk(
  'posts/addNewPosts',
  async function(post,{rejectWithValue, dispatch}){
    try{
    const response = await fetch(uriPosts,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(post)
    })
    if(!response.ok){
      throw new Error('Cant add post. Server Error')
    }
    const data = await response.json()
    dispatch(AddPost(data))


    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

export const addNewComment = createAsyncThunk(
  'posts/addNewComment',
  async function(comment, {rejectWithValue, dispatch}){
    try{
      const response = await fetch(uriComments,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(comment)
      })
      if(!response.ok){
        throw new Error('Cant add comment. Server error')
      }
      const data = await response.json()
      dispatch(AddComment(data))

    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

// редактирование постов и комментариев
export const changeValuePost= createAsyncThunk(
  'posts/changeValuePost',
  async function(value, {rejectWithValue, dispatch}){
    const {id, title, body} = value
    try{
      const response = await fetch(uriPosts + id, {
        method:"PATCH",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          title,
          body
        })
      })
      if(!response.ok){
        dispatch(ChangePost({id, title, body}))
        throw new Error('Ошибка.Данные не находяться на сервере, редактирование только на фронтэнде')
      }
      dispatch(ChangePost({id, title, body}))
    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)
export const changeValueComment = createAsyncThunk(
  'posts/changeValueComment',
  async function(value, {rejectWithValue, dispatch}){
    const {id, text} = value
    try{
      const response = await fetch(uriComments + id, {
        method:"PATCH",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          text
        })
      })
      if(!response.ok){
        dispatch(ChangeComment({id, text}))
        throw new Error('Ошибка.Данные не находяться на сервере, редактирование только на фронтэнде')
      }
      dispatch(ChangeComment({id, text}))
    }catch(e){
      return rejectWithValue(e.message)
    }
  }
)

//обработка ошибок
const setError = (state, {payload}) => {
  state.status = 'rejected'
  state.error = payload
}

const postsSLice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    sortedComment: [],
    status:null,
    error:null
  },
  reducers: {
    //фильтрует комментарии для постов, засовывая отфильтрованное в новый массив
    SortComment(state, {payload}) {
      state.sortedComment = []
      const post = state.posts.find(post => post.id === payload.id)
      payload.comments.forEach(comment => {
        if(comment.postId === post.id){
          state.sortedComment.push(comment)
        }
      })
    },
    //редьюсеры для добавления постов и комментариев
    AddPost({posts}, {payload}) {
      posts.push(payload);
    },
    AddComment(state, {payload}) {
      state.sortedComment.push(payload);
    },
    //редьюсеры для удаления постов и комментариев
    RemovePost(state, {payload}) {
      state.posts = state.posts.filter(post => post.id !== payload);
    },
    RemoveComment(state, {payload}) {
      state.sortedComment = state.sortedComment.filter(comment => comment.id !== payload);
    },
    //редьюсеры для редактирования постов и комментариев
    ChangePost(state, {payload}) {
      const findPost = state.posts.find(post => post.id === payload.id);
      findPost.body = payload.body;
      findPost.title = payload.title;
    },
    ChangeComment(state, {payload}) {
      const findCommentSort = state.sortedComment.find(comment => comment.id === payload.id)
      findCommentSort.text = payload.text
    },
  },
  extraReducers: builder => {
    //реализация асинхронных процессов в 3-ех разных состояниях
    //(закгрузка, завершение, ошибка)
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchPosts.fulfilled, (state, {payload}) => {
      state.status = 'resolved'
      state.posts = payload
    })
    builder.addCase(fetchComments.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchComments.fulfilled, (state) => {
      state.status = 'resolved'
    })
    builder.addCase(fetchPosts.rejected, setError)
    builder.addCase(fetchComments.rejected, setError)
    builder.addCase(deletePost.rejected, setError)
    builder.addCase(deleteComment.rejected, setError)
    builder.addCase(addNewPost.rejected, setError)
    builder.addCase(addNewComment.rejected, setError)
    builder.addCase(changeValuePost.rejected, setError)
    builder.addCase(changeValueComment.rejected, setError)
  }
});

export default postsSLice.reducer;
export const {
  AddPost,
  SortComment,
  AddComment,
  RemovePost,
  RemoveComment,
  ChangePost,
  ChangeComment,
} = postsSLice.actions;
export const PostState = state => state.posts;
