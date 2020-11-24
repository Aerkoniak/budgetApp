import { createSlice } from '@reduxjs/toolkit';

export const historySlice = createSlice({
    name: "history",
    initialState: {
        operations: [{
            id: 1,
            shop: "Biedronka",
            submitedList: [
                { name: "Jedzenie", amount: 10 },
                { name: "Rachunki", amount: 45 }
            ],
            total: 55
        },
        {
            id: 2,
            shop: "Żabka",
            submitedList: [
                { name: "Jedzenie", amount: 10 },
                { name: "Paliwo", amount: 50 }
            ],
            total: 60
        },
        {
            id: 3,
            shop: "Lewiatan",
            submitedList: [
                { name: "Używki", amount: 15 },
                { name: "Jedzenie", amount: 15 }
            ],
            total: 30
        },
        {
            id: 4,
            shop: "Żabka",
            submitedList: [
                { name: "Używki", amount: 8 },
                { name: "Domowe", amount: 12 }
            ],
            total: 20
        }]
    },
    reducers: {
        addOperation: (state, action) => {
            let id = state.operations.length + 1;
            let operation = action.payload;
            operation.id = id;
            const history = state.operations;
            history.push(operation)
            state.operations = history
        }
    }
})

export const { addOperation } = historySlice.actions;

export const historyList = state => state.history.operations;


export default historySlice.reducer;

