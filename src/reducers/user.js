import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    token: '',
    userType: '',
    vehicleId: '',
  },
  reducers: {
    setUserData: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.vehicleId = action.payload.vehicleId;
    },
    clearData: (state, action) => {
      state = userSlice.getInitialState();
    },
  },
});

export const {setUserData, clearData} = userSlice.actions;

export default userSlice.reducer;
