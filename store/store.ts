import { configureStore } from '@reduxjs/toolkit'
import { reducer as postSliceReducer } from './feature/post/post';

const store = configureStore({
  reducer: {
    post: postSliceReducer,
  },
});

export default store;
