import { createSlice } from '@reduxjs/toolkit';

const wishesSlice = createSlice({
  name: 'wishes',
  initialState: {
    wishes: [],
    loading: false,
    error: null,
    totalCount: 0
  },
  reducers: {
    setWishes: (state, action) => {
      state.wishes = action.payload;
    },
    addWish: (state, action) => {
      state.wishes.unshift(action.payload);
      if (state.wishes.length > 50) {
        state.wishes = state.wishes.slice(0, 50);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    }
  }
});

export const { setWishes, addWish, setLoading, setError, setTotalCount } = wishesSlice.actions;
export default wishesSlice.reducer;
