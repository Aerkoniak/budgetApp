import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Shops.module.css'
import { selectSubmitedList, selectExpense } from '../expense/expenseSlice';

export function Shops() {

    const submitedList = useSelector(selectSubmitedList)
    const total = useSelector(selectExpense)

    const summary = submitedList.map((element, index) => {
        let name = element.name.toLowerCase()
        if (element.amount === 0) return
        else {
            return (
                <li key={element.name + index}>
                    <p>{`na ${name} wydałeś dziś ${element.amount} peelenów`}</p>
                </li>

            )
        }
    })

    return (
        <div className={styles.shops}>
            <p>Podsumowanie:</p>
            <p>{`Łącznie wydałeś dzisiaj ${total} PLN.`}</p>
            <ul className={styles.summaryList}>
                {summary}
            </ul>

        </div>
    )
}