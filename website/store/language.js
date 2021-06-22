import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nation: "eng"
}

const slice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setNation: (state, action) => {
        state.nation = action.payload 
    },
  }
})

export const {setNation} = slice.actions

export default slice.reducer