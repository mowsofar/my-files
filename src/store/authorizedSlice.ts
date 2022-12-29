import { createSlice } from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
    name: 'isAuth',
    initialState: {
        isAuth: false,
        text: ''
    },
    reducers: {
        changeIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        addText(state, action) {
            state.text = action.payload;
        }
    }
})

export const {changeIsAuth, addText} = authorizedSlice.actions;
export default authorizedSlice.reducer;