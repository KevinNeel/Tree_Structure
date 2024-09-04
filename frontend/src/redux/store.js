import { configureStore } from '@reduxjs/toolkit';

import AuthSlice from './Slice/AuthSlice';
import TreeSlice from './Slice/TreeSlice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        tree: TreeSlice
    }
});
