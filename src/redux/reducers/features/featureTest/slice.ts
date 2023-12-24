import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface FeatureState {
  value: number;
}

// Define the initial state using that type
const initialState: FeatureState = {
  value: 0,
};

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Define reducers and corresponding actions
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = featureSlice.actions;

// Export the reducer, to be used in the store
export default featureSlice.reducer;
