import { configureStore } from '@reduxjs/toolkit';
import posts from "./cardSlice";

export default configureStore({
    reducer:{
        posts
    },
})