import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [{ name: "Jedzenie" }, { name: "Używki" }, { name: "Domowe" }, { name: "Paliwo" }, { name: "Rachunki" }],
        shops: [{ name: "Biedronka" }, { name: "Żabka" }, { name: "Lewiatan" }, { name: "Internet" }]
    },
    reducers: {
        addCategory: (state, action) => {
            const list = state.list;
            list.push({ name: `${action.payload}` })
            state.list = list;
        }
    }
})

export const { addCategory } = categoriesSlice.actions;

export const selectCategoriesList = state => state.categories.list;
export const selectShopsList = state => state.categories.shops;

export default categoriesSlice.reducer;
