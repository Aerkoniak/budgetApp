import React, { useState, useEffect } from 'react'
import styles from './Shops.module.css'


const ShopsButtons = ({ shopList }) => {

    const [isBtnFocused, toggleBtn] = useState(false);
    const [focusedList, manageList] = useState([])

    const toggleSupporter = (name) => {
        let list = focusedList;
        let shopIndex = false;

        list.map((shop, index) => {
            if (shop === name) {
                shopIndex = index;
            }
        })
        if (shopIndex || shopIndex === 0) {
            list.splice(shopIndex, 1)
        } else {
            list.push(name);
        }
        manageList(list)
        console.log(list)
    }



    const shops = shopList.map((shop, index) => {
        let isfocused = false
        focusedList.map((focusedShop, index) => {
            if (focusedShop === shop.name) isfocused = true
        })
        return (
            <button onClick={(e) => toggleSupporter(e.target.id)} id={shop.name} className={isfocused ? styles.shopsButtonFocused : styles.shopsButton}>{shop.name}</button>
        )
    })

    return (
        <div className={styles.shopsList}>
            {shops}
        </div>
    )
}

export default ShopsButtons