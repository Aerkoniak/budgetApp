import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Shops.module.css'
import { selectSubmitedList, selectExpense } from '../expense/expenseSlice';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { selectShopsList } from '../categories/categoriesSlice';

export function Shops() {

    const submitedList = useSelector(selectSubmitedList);
    const total = useSelector(selectExpense);

    const ToggleButtonGroupControled = () => {
        const shopList = useSelector(selectShopsList);
        const [value, setValue] = useState([]);

        const handleChange = (val) => setValue(val);

        const shops = shopList.map((shop, index) => ((
            <ToggleButton className={styles.toggleBtn} variant='outline-success' key={index + shop.name} value={shop.name}>
                {shop.name}
            </ToggleButton>
        )))
        return (
            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                {shops}
            </ToggleButtonGroup>
        );
    }



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
            <ToggleButtonGroupControled />
        </div>
    )
}