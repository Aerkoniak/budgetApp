import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        total: 0,
        stage: false,
        rest: 0,
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
        },
        undoStage: (state, action) => {
            if (!action.payload) {
                state.stage = action.payload;
                state.rest = 0
            }
            else if (action.payload === "one") {
                state.stage = action.payload;
                state.rest = 0
            }

        }
    }
})

export const { setExpense, split, nextStage, undoStage } = expenseSlice.actions;

export const selectExpense = state => state.expense.total;
export const selectStage = state => state.expense.stage;
export const selectSubmitedList = state => state.expense.submitArray

export default expenseSlice.reducer;