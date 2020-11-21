import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExpense, selectExpense } from './expenseSlice';
import styles from './Expense.module.css'
import { Button } from 'react-bootstrap'

export function Expense() {

    // const expense = useSelector(selectExpense);
    const dispatch = useDispatch()
    const [todaysExpense, setTodayExpense] = useState(false);

    return (
        <div className={styles.expense}>
            <h4 className={styles.header}>Cześć! Ile dzisiaj wydałeś?</h4>

            <form >
                <input type="number" className={styles.input} value={todaysExpense} onChange={(e) => setTodayExpense(Number(e.target.value))} />

                <Button className={styles.confirm} variant="outline-light" type="submit" onClick={() => {
                    dispatch(setExpense(todaysExpense));
                    setTodayExpense(false)
                }} >Zatwierdź</Button>
            </form>

        </div>
    )
}