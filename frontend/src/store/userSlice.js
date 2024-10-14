import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: "",
  },

  reducers: {
    onSuccessfulLogin: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
  },
});

export const { onSuccessfulLogin } = userSlice.actions;

export default userSlice.reducer;
