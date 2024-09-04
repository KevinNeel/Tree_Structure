import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    user: "",
    success: null,
    loading: false,
    error: null,
};


// Login
export const register = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => { 
        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/user/register`, formData); 
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => { 
        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/user/login`, { email, password }); 
            const { message, user, token } = response.data;

            localStorage.setItem("access_Token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify({
                ...user
            }));
            return { message, user, token };

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder

            // register
            .addCase(register.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload : "Registration failed";
            })

            // login
            .addCase(login.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload : "Login failed";
            })

    }
});

export default authSlice.reducer;
