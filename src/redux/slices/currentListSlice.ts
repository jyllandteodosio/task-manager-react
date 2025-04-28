import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListType } from '@/types/lists';

interface CurrentListState {
    currentList: ListType | null;
}

const initialState: CurrentListState = {
    currentList: null,
};

const currentListSlice = createSlice({
    name: 'currentList',
    initialState,
    reducers: {
        setCurrentList: (state, action: PayloadAction<ListType>) => {
            state.currentList = action.payload;
        },
        clearCurrentList: (state) => {
            state.currentList = null;
        },
    },
});

export const { setCurrentList, clearCurrentList } = currentListSlice.actions;
export default currentListSlice.reducer;