import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchComments as reqFetchComments,
  postComment as reqPostComment,
  putComment as reqPutComment,
  deleteComment as reqDeleteComment,
} from "~/lib/apis/comment";

const initialState = {
  comments: {},
  selectedFriend: null,
  loading: "idle",
};

const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (feedId, thunkAPI) => {
    const response = await reqFetchComments(feedId);
    return response;
  }
);

const postComment = createAsyncThunk(
  "comment/postComment",
  async ({ feedId, content }, thunkAPI) => {
    const response = await reqPostComment(feedId, content);
    return response;
  }
);

const putComment = createAsyncThunk(
  "comment/putComment",
  async ({ commentId, content }, thunkAPI) => {
    const response = await reqPutComment(commentId, content);
    return response;
  }
);

const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, thunkAPI) => {
    const response = await reqDeleteComment(commentId);
    return response;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setSelectedFriend: (state, action) => {
      state.selectedFriend = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = "fulfilled";

        action.payload.forEach((comment) => {
          const { feed, _id, ...rest } = comment;

          if (!state.comments[feed]) {
            state.comments[feed] = [];
          }

          if (
            !state.comments[feed].some(
              (existingComment) => existingComment._id === _id
            )
          ) {
            state.comments[feed].push(comment);
          }
        });
      })
      .addCase(fetchComments.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        const comment = action.payload;

        if (!state.comments[comment.feed]) {
          state.comments[comment.feed] = [];
        }
        state.comments[comment.feed].push(comment);
      })
      .addCase(postComment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postComment.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(putComment.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(putComment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(putComment.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        const deletedCommentId = action.meta.arg;

        Object.keys(state.comments).forEach((feedId) => {
          state.comments[feedId] = state.comments[feedId].filter(
            (comment) => comment._id !== deletedCommentId
          );
        });
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { setSelectedFriend } = commentSlice.actions;
export { fetchComments, postComment, putComment, deleteComment };
export default commentSlice.reducer;
