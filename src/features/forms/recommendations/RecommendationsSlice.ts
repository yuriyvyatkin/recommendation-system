import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendation: '',
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    changeRecommendationsField(state, { payload }) {
      return payload;
    },
    resetRecommendations(state) {
      return initialState;
    }
  },
});

export const {
  changeRecommendationsField,
  resetRecommendations
} = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
