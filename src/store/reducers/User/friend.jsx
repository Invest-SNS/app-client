import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFriends as reqFetchFriends,
  fetchPendingFriends as reqFetchPendingFriends,
  fetchFriendsState as reqFetchFriendsState,
  fetchFriendCount as reqFetchFriendCount,
  postFriendRequest as reqPostFriendRequest,
  postFriendAccept as reqPostFriendAccept,
  deleteFriend as reqDeleteFriend,
  deleteFriendRequest as reqDeleteFriendRequest,
  deleteMyRequest as reqDeleteMyRequest,
  postSearchFriend as reqPostSearchFriend,
} from "~/lib/apis/friend";

const initialState = {
  friends: [],
  pendingFriends: [],
  friendsState: null,
  friendCount: null,
  friendNickname: null,
  friendId: null,
  friendSearch: [],
  loading: "idle",
};

const fetchFriends = createAsyncThunk(
  "friend/fetchFriends",
  async (data, thunkAPI) => {
    const response = await reqFetchFriends();
    return response;
  }
);

const fetchPendingFriends = createAsyncThunk(
  "friend/fetchPendingFriends",
  async (data, thunkAPI) => {
    const response = await reqFetchPendingFriends();
    return response;
  }
);

const fetchFriendsState = createAsyncThunk(
  "friend/fetchFriendsState",
  async (friendId, thunkAPI) => {
    const response = await reqFetchFriendsState(friendId);
    return response;
  }
);

const fetchFriendCount = createAsyncThunk(
  "friend/fetchFriendCount",
  async (userId, thunkAPI) => {
    const response = await reqFetchFriendCount(userId);
    return response;
  }
);

const postFriendRequest = createAsyncThunk(
  "friend/postFriendRequest",
  async (friendId, thunkAPI) => {
    const response = await reqPostFriendRequest(friendId);
    return response;
  }
);

const postFriendAccept = createAsyncThunk(
  "friend/postFriendAccept",
  async (friendId, thunkAPI) => {
    const response = await reqPostFriendAccept(friendId);
    return response;
  }
);

const deleteFriend = createAsyncThunk(
  "friend/deleteFriend",
  async (friendId, thunkAPI) => {
    const response = await reqDeleteFriend(friendId);
    return response;
  }
);

const deleteFriendRequest = createAsyncThunk(
  "friend/deleteFriendRequest",
  async (friendId, thunkAPI) => {
    const response = await reqDeleteFriendRequest(friendId);
    return response;
  }
);

const deleteMyRequest = createAsyncThunk(
  "friend/deleteMyRequest",
  async (friendId, thunkAPI) => {
    const response = await reqDeleteMyRequest(friendId);
    return response;
  }
);

const postSearchFriend = createAsyncThunk(
  "friend/postSearchFriend",
  async ({ nickname }, thunkAPI) => {
    const response = await reqPostSearchFriend(nickname);
    return response;
  }
);

const friendSlice = createSlice({
  name: "friend",
  initialState: initialState,
  reducers: {
    setFriendNickname: (state, action) => {
      state.friendNickname = action.payload;
    },
    setFriendId: (state, action) => {
      state.friendId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friends = action.payload;
      })
      .addCase(fetchFriends.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchPendingFriends.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.pendingFriends = action.payload;
      })
      .addCase(fetchPendingFriends.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPendingFriends.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchFriendsState.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friendsState = action.payload;
      })
      .addCase(fetchFriendsState.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFriendsState.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchFriendCount.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friendCount = action.payload.friendCount;
      })
      .addCase(fetchFriendCount.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFriendCount.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postFriendRequest.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friendsState = { friendId: action.meta.arg, state: "requested" };
      })
      .addCase(postFriendRequest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postFriendRequest.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postFriendAccept.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        const acceptedFriend = state.pendingFriends.find(
          (friend) => friend._id === action.meta.arg
        );
        if (acceptedFriend) {
          state.friends = [...state.friends, acceptedFriend];
        }
        state.pendingFriends = state.pendingFriends.filter(
          (friend) => friend._id !== action.meta.arg
        );
      })
      .addCase(postFriendAccept.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postFriendAccept.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friends = state.friends.filter(
          (friend) => friend._id !== action.meta.arg
        );
      })
      .addCase(deleteFriend.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteFriend.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteFriendRequest.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.pendingFriends = state.pendingFriends.filter(
          (friend) => friend._id !== action.meta.arg
        );
      })
      .addCase(deleteFriendRequest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteFriendRequest.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteMyRequest.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friendsState = { friendId: action.meta.arg, state: "" };
      })
      .addCase(deleteMyRequest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteMyRequest.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postSearchFriend.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.friendSearch = action.payload;
      })
      .addCase(postSearchFriend.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postSearchFriend.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { setFriendNickname, setFriendId } = friendSlice.actions;
export {
  fetchFriends,
  fetchPendingFriends,
  fetchFriendsState,
  fetchFriendCount,
  postFriendRequest,
  postFriendAccept,
  deleteFriend,
  deleteFriendRequest,
  deleteMyRequest,
  postSearchFriend,
};
export default friendSlice.reducer;
