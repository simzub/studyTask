import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageItem, TaskHours } from '../components/InputContainer';

interface DataState {
  storageItems: StorageItem[];
  taskHours: TaskHours | null;
}

const initialState: DataState = {
  storageItems: [],
  taskHours: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<StorageItem[]>) => {
      state.storageItems = action.payload;
    },
    setTaskHours: (state, action: PayloadAction<TaskHours>) => {
      state.taskHours = action.payload;
    },
    updateHours: (
      state,
      action: PayloadAction<{
        storageItems: StorageItem[];
        taskHours: TaskHours;
      }>
    ) => {
      state.storageItems = action.payload.storageItems;
      state.taskHours = action.payload.taskHours;
    },
  },
});

export const { setData, setTaskHours, updateHours } = dataSlice.actions;

export default dataSlice.reducer;
