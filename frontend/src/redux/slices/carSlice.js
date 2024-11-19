import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCars: [],
  userCars: [],
  carDetail: {},
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setAllCars: (state, action) => {
      state.allCars = action.payload;
    },
    setUserCars: (state, action) => {
      state.userCars = action.payload;
    },
    setCarDetail: (state, action) => {
      state.carDetail = action.payload;
    },
  },
});

export const { setAllCars, setUserCars, setCarDetail } = carSlice.actions;

export default carSlice.reducer;
