import { BlogPost, BlogPostData, Topic } from "../../models/blogPostModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserModel } from "../../models/userModel";

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
    postBlogPostStart: (state) => {
      state.isLoading = true;
      state.isError = undefined;
    },

    postBlogPostSuccess: (state) => {
      state.isLoading = false;
      state.isError = undefined;
    },

    postBlogPostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
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

export const {
  getBlogPosts,
  postsLoading,
  postsError,
  getTopics,
  postBlogPostStart,
  postBlogPostSuccess,
  postBlogPostFailure,
} = blogSlice.actions;

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

export const postBlogPost =
  (title: string, data: any, user: UserModel) => async (dispatch: any) => {
    try {
      dispatch(postBlogPostStart());

      const postData: BlogPostData = {
        topic: { id: 1, name: "Tech" },
        title: title,
        content: JSON.stringify(data),
        cover: null,
        user: user.pk,
      };

      console.log(postData);

      await axios.post("http://127.0.0.1:8000/api/blogposts/", postData);

      dispatch(postBlogPostSuccess());

      // Reset the form or perform any other necessary actions
      // setTitle("");
      // setData(placeholder);
    } catch (error) {
      dispatch(postBlogPostFailure("Error submitting post"));
      console.error("Error submitting post:", error);
      // Handle error as needed
    }
  };
