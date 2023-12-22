import { BlogPost, BlogPostData, Topic } from "../../models/blogPostModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserModel } from "../../models/userModel";

interface Posts {
  blogPosts: BlogPost[];
  userBlogPosts: BlogPost[];
  detailPost: BlogPost | undefined;
  topics: Topic[];
  isLoading: boolean;
  isError: string | undefined;
  progress: number;
}

const initialState: Posts = {
  blogPosts: [],
  userBlogPosts: [],
  detailPost: undefined,
  topics: [],
  isLoading: false,
  isError: undefined,
  progress: 0,
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
    getBlogPostByIdStart: (state) => {
      state.isLoading = true;
      state.isError = undefined;
    },

    getBlogPostByIdSuccess: (state) => {
      state.isLoading = false;
      state.isError = undefined;
    },

    getBlogPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    getBlogPostById: (state, action: PayloadAction<BlogPost>) => {
      state.detailPost = action.payload; // Assuming you want to store the single post in the blogPosts array
      state.isLoading = false;
      state.isError = undefined;
    },
    getUserBlogPosts: (state: Posts, action: PayloadAction<BlogPost[]>) => {
      state.userBlogPosts = action.payload;
      state.isLoading = false;
      state.isError = undefined;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    resetDetailPost: (state) => {
      state.detailPost = undefined;
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
  getBlogPostByIdStart,
  getBlogPostByIdSuccess,
  getBlogPostByIdFailure,
  getBlogPostById,
  getUserBlogPosts,
  updateProgress,
  resetDetailPost,
} = blogSlice.actions;

export default blogSlice.reducer;

export const fetchBlogPosts = () => async (dispatch: any) => {
  try {
    dispatch(postsLoading(true));
    const res = await axios.get("http://127.0.0.1:8000/api/blogposts/");

    const blogListData = res.data;
    dispatch(getBlogPosts(blogListData));
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

export const fetchUserBlogPosts =
  (userId: number | undefined) => async (dispatch: any) => {
    try {
      dispatch(postsLoading(true));
      const res = await axios.get(
        `http://127.0.0.1:8000/api/blogposts/user/${userId}`
      );
      const userBlogPostsData = res.data;
      dispatch(getUserBlogPosts(userBlogPostsData));
    } catch (error) {
      dispatch(postsError("Error"));
    }
  };

// In your BlogPostReducer.ts file
export const postBlogPost =
  (formData: FormData, user: UserModel) => async (dispatch: any) => {
    try {
      dispatch(postBlogPostStart());

      formData.append("user", user.pk?.toString() ?? "");
      // formData.append("topic", topicString);

      console.log(
        "FormData content from Reducer:",
        Array.from(formData.entries())
      );

      await axios
        .post("http://127.0.0.1:8000/api/blogposts/", formData, {
          onUploadProgress: (progressEvent) => {
            let percentCompleted = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            dispatch(updateProgress(percentCompleted));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      dispatch(postBlogPostSuccess());
      dispatch(updateProgress(0));

      // Reset the form or perform any other necessary actions
      // setTitle("");
      // setData(placeholder);
    } catch (error) {
      dispatch(postBlogPostFailure("Error submitting post"));
      console.error("Error submitting post:", error);
      // Handle error as needed
    }
  };

export const fetchBlogPostById = (postId: number) => async (dispatch: any) => {
  try {
    dispatch(getBlogPostByIdStart());
    const res = await axios.get(
      `http://127.0.0.1:8000/api/blogposts/${postId}/`
    );
    const blogPostData: BlogPost = res.data;
    dispatch(getBlogPostById(blogPostData));
  } catch (error) {
    dispatch(getBlogPostByIdFailure("Error"));
  }
};

export const deleteBlogPostById = (postId: number) => async (dispatch: any) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/blogposts/${postId}/`);
    console.log(`Blog post with ID ${postId} deleted successfully.`);
    // You can dispatch an action here if needed
  } catch (error) {
    console.error(`Error deleting blog post with ID ${postId}:`, error);
    // You can dispatch an action here if needed
  }
};

export const updateBlogPost =
  (postUpdate: BlogPost) => async (dispatch: any) => {
    try {
      dispatch(postBlogPostStart());

      console.log("REDUX UPDATEBLOGPOST", postUpdate);

      const formData = new FormData();
      formData.append("id", postUpdate.id.toString());
      formData.append("user", postUpdate.user?.id?.toString() ?? "");
      formData.append("title", postUpdate.title);
      formData.append("content", postUpdate.content);
      formData.append("topic", postUpdate.topic.id.toString());

      if (postUpdate.cover instanceof File) {
        formData.append("cover", postUpdate.cover);
        console.log("file");
      } else if (typeof postUpdate.cover === "string") {
        formData.append("cover", postUpdate.cover);
        console.log("string");
      }

      await axios.put(
        `http://127.0.0.1:8000/api/blogposts/${postUpdate.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(postBlogPostSuccess());
    } catch (error) {
      dispatch(postBlogPostFailure("Error updating post"));
      console.error("Error updating post:", error);
    }
  };
