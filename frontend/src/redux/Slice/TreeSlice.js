import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import baseURL from '../../Api/Api'

const initialState = {
    tree: "",
    success: null,
    loading: false,
    error: null,
};


// Tree
export const tree = createAsyncThunk(
    "tree/getTree",
    async () => {
        try {
            console.log(baseURL, 'this is base url');
            const response = await baseURL.get(`/tree`);
            return response.data

        } catch (error) {
            return error.response.data;
        }
    }
);

export const createTree = createAsyncThunk(
    "tree/createTree",
    async ({ name, parentId }, { rejectWithValue }) => {
        try {
            const response = await baseURL.post(`/tree`, { name, parentId });
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const treeSlice = createSlice({
    name: 'tree',
    initialState,
    extraReducers: (builder) => {
        builder

            // Tree
            .addCase(tree.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(tree.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(tree.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload : "Failed to fetch the data";
            })

            // createTree
            .addCase(createTree.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(createTree.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(createTree.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload : "Failed to post the data";
            })
    }
});

export default treeSlice.reducer;
