import { BlogPost, Topic } from "../../models/blogPostModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Posts {
  blogPosts: BlogPost[];
  topics: Topic[];
  isLoading: boolean;
  isError: string | undefined;
}

const initialState: Posts = {
  blogPosts: [],
  topics: [],
  isLoading: false,
  isError: undefined,
};

const blogSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    getTopics: (state, action: PayloadAction<Topic[]>) => {
      state.topics = action.payload;
      state.isLoading = false;
      state.isError = undefined;
    },
    getBlogPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.blogPosts = action.payload;
      state.isLoading = false;
      state.isError = undefined;
    },
    postsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.isError = undefined;
    },
    postsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { getBlogPosts, postsLoading, postsError, getTopics } =
  blogSlice.actions;

export default blogSlice.reducer;

export const fetchBlogPosts = () => async (dispatch: any) => {
  try {
    console.log("FETCH");
    dispatch(postsLoading(true));
    const res = await axios.get("http://127.0.0.1:8000/api/blogposts/");
    console.log("🚀 ~ file: blogPostSlice.ts:46 ~ fetchBlogPosts ~ res:", res);

    const blogListData = res.data;
    dispatch(getBlogPosts(blogListData));
    console.log("FETCHED");
  } catch (error) {
    dispatch(postsError("Error"));
  }
};

export const fetchTopics = () => async (dispatch: any) => {
  try {
    dispatch(postsLoading(true));
    const res = await axios.get("http://127.0.0.1:8000/api/topics/");
    const topicsData = res.data;
    dispatch(getTopics(topicsData));
  } catch (error) {
    dispatch(postsError("Error"));
  }
};
