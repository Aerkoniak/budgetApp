import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Shops.module.css'
import { selectSubmitedList, selectExpense, undoStage } from '../expense/expenseSlice';
import { ToggleButtonGroup, ToggleButton, Button, InputGroup, FormControl } from 'react-bootstrap'
import { selectShopsList, addShop } from '../categories/categoriesSlice';
import { addOperation } from '../history/historySlice';
// import ShopsButtons from './ShopsButtons';

export function Shops() {

    const dispatch = useDispatch();
    const submitedList = useSelector(selectSubmitedList);
    const total = useSelector(selectExpense);

    const shopList = useSelector(selectShopsList);
    const [shopValue, setShopValue] = useState("");
    const [shopName, setShopName] = useState("");
    const [isAddShop, hideAddShop] = useState(false);
    const [warnings, setWarnings] = useState("");



    const addShopSupporter = () => {
        let isNew = true;
        shopList.map((cat, index) => {
            if (cat.name.toLowerCase() === shopName.toLowerCase()) isNew = false;
        })
        if (isNew) {
            dispatch(addShop(shopName));
            setWarnings("");
        }
        else setWarnings("Sklep znajduje się już na liście")

        setShopName("");
        hideAddShop(false);
    }

    const saveOperationSupporter = () => {
        const operation = {
            total,
            submitedList,
            shop: shopValue,
        }
        dispatch(addOperation(operation));
        dispatch(undoStage(false));
    }
    const summary = submitedList.map((element, index) => {
        let name = element.name.toLowerCase()
        if (element.amount === 0) return
        else {
            return (
                <li key={element.name + index}>
                    <p>{`na ${name} wydano ${element.amount} peelenów`}</p>
                </li>

            )
        }
    })

    const shops = shopList.map((shop, index) => ((
        <ToggleButton variant="outline-light" value={shop.name}>
            {shop.name}
        </ToggleButton>
    )))

    return (
        <div className={styles.shops}>
            <p>Podsumowanie:</p>
            <p>{`Łącznie wydano dzisiaj ${total} PLN.`}</p>
            <ul className={styles.summaryList}>
                {summary}
            </ul>
            <p>Wybierz sklep, w którym robiłeś właśnie zakupy:</p>
            <ToggleButtonGroup className={styles.shopsList} type="radio" name="options" value={shopValue} onChange={val => setShopValue(val)} >
                {shops}
            </ToggleButtonGroup>

            <Button size="lg" className={styles.confirm} variant="outline-light" type="submit" onClick={saveOperationSupporter} >Zapisz operację</Button>
            <Button size="sm" className={styles.confirm} variant="outline-info" onClick={() => {
                dispatch(undoStage("one"))
            }}>Cofnij</Button>

            <Button className={styles.addShopBtn} block onClick={() => hideAddShop(!isAddShop)}>Dodaj sklep do listy</Button>

            <InputGroup className={isAddShop ? styles.addShop : styles.addShopHide}>
                <FormControl
                    aria-describedby="basic-addon2"
                    placeholder="Nazwa sklepu"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-light" onClick={addShopSupporter}>Dodaj kategorię</Button>
                </InputGroup.Append>
            </InputGroup>
            {warnings ? <p>{warnings}</p> : null}

        </div>
    )
}