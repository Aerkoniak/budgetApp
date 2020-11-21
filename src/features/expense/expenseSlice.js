import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        total: 0,
        stage: false,
        rest: false,
    },
    reducers: {
        setExpense: (state, action) => {
            state.total = action.payload;
            state.stage = "one"
        },
        split: (state, action) => {
            state.rest = (!state.rest ? state.total : state.rest) - action.payload.amount;
        },
        nextStage: (state, action) => {
            state.stage = "two";
            state.submitArray = action.payload
        }
    }
})

export const { setExpense, split, nextStage } = expenseSlice.actions;

export const selectExpense = state => state.expense.total;

export const selectStage = state => state.expense.stage;
export const selectSubmitedList = state => state.expense.submitArray

export default expenseSlice.reducer;