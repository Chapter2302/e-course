import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: ""
}

const slice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortType: (state, action) => {
        state.type = action.payload 
    },
  }
})

export const {setSortType} = slice.actions

export default slice.reducer