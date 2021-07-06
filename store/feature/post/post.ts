import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { Dispatch } from "redux";

export interface PostState {
  posts: any[],
  post: object,
  loading: boolean,
  error: object | null,
}

const initialState: PostState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postLoading: (state) => {
      state.post = {};
      state.posts = [];
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    getPostsSuccess: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    postsError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    }
  },
});

export const { postLoading, getPostsSuccess, postsError } = postSlice.actions;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(postLoading());
  try {
    const res = await axios.get('api/posts');
    dispatch(getPostsSuccess(res.data));
  } catch (e) {
    dispatch(postsError(e));
  }
};

// @ts-ignore
export const { reducer } = postSlice;
