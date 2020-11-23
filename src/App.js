import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { selectStage } from './features/expense/expenseSlice'
import { useSelector } from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Expense } from './features/expense/Expense';
import Categories from './features/categories/Categories';
import { Shops } from './features/shops/Shops';
import History from './features/history/History';


function App() {

  const expenseStage = useSelector(selectStage)

  return (
    <div className="App">
      <div className="history">
        <h3 className="">Historia</h3>
        <History />
      </div>
      <div className="today">
        {!expenseStage ?
          <Expense />
          : null}
        {expenseStage === "one" ?
          <Categories />
          : null}
        {expenseStage === "two" ?
          <Shops />
          : null}
      </div>

    </div>
  );
}

export default App;
