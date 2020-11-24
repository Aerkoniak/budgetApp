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
import { useState } from 'react';


function App() {

  const expenseStage = useSelector(selectStage);
  const [isHistoryVisible, showHistory] = useState(false)
  // style={isHistoryVisible ? { display: "block" } : null}

  return (
    <div className="App">

      <div className="history" id="history" style={isHistoryVisible ? { display: "block", order: 2 } : null} >
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

        <span className="mobileLink" onClick={() => showHistory(!isHistoryVisible)}><a href="#history">{isHistoryVisible ? "kliknij tutaj by zamknąć historię" : "kliknij tutaj by otworzyć historię"}</a> </span>
      </div>

    </div >
  );
}

export default App;
