import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectExpense, split, nextStage } from '../expense/expenseSlice';
import { selectCategoriesList, addCategory } from '../categories/categoriesSlice';

import styles from './Categories.module.css'
import { Accordion, Card, InputGroup, FormControl, Button } from 'react-bootstrap'

function Categories() {

    const dispatch = useDispatch();
    const total = useSelector(selectExpense);
    const inne = useSelector(state => state.expense.rest)

    const categoriesList = useSelector(selectCategoriesList);
    const [newCategory, setNewCategory] = useState("");
    const [catValue, setCatValue] = useState("");
    const [catArray, setCatArray] = useState([]);
    const [isAddCat, hideAddCat] = useState(false);
    const [warnings, setWarnings] = useState("")

    const splitExpense = (id) => {
        const array = catArray;
        const payload = {
            name: id,
            amount: Number(catValue)
        }
        console.log(payload);
        setCatValue(false);
        dispatch(split(payload));
        array.push(payload);
        setCatArray(array)
    }

    const addCatSupporter = () => {
        let isNew = true;
        categoriesList.ForEach((cat, index) => {
            if (cat.name.toLowerCase() === newCategory.toLowerCase()) isNew = false;
        })
        if (isNew) {
            dispatch(addCategory(newCategory));
            setWarnings("")
        }
        else setWarnings("Kategoria znajduje się już na liście")

        setNewCategory("");
        hideAddCat(false);
    }

    const submitStage = () => {
        let submitArray = [];
        let rest = {
            name: "Inne",
            amount: inne
        }
        if (inne) submitArray.push(rest);

        catArray.map(pos => submitArray.push(pos))
        // console.log(submitArray)
        dispatch(nextStage(submitArray))
    }

    const cards = categoriesList.map((category, index) => ((
        <Card key={index} className={styles.dark}>
            <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                {category.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                    <div className={styles.category}>
                        <form>
                            <input type="number" value={catValue} onChange={e => setCatValue(e.target.value)} />
                            <Button variant="outline-light" type="submit" id={`${category.name}`} onClick={(e) => {
                                e.preventDefault();
                                splitExpense(e.target.id)
                            }}>Zapisz</Button>
                        </form>
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )))

    const rest = catArray.map(cat => {
        return (
            <p key={cat.amount + cat.name} className={styles.listElement}>{`Na ${cat.name} poszło ${cat.amount} PLN`}</p>
        )
    })

    return (
        <div className={styles.categories}>
            <p>Podziel kwotę między kategoriami</p>
            <p className={styles.header}>Wydałeś dziś {total} PLN</p>
            {inne ? <p className={styles.listElement}>Na Inne poszło {inne} PLN</p> : null}
            {rest}

            <Accordion >
                {cards}
            </Accordion>

            <Button onClick={() => hideAddCat(!isAddCat)} block>Dodaj kategorię wydatków</Button>

            <InputGroup className={isAddCat ? styles.addCat : styles.addCatHide}>
                <FormControl
                    aria-describedby="basic-addon2"
                    placeholder="Nazwa kategorii"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-light" onClick={addCatSupporter}>Dodaj kategorię</Button>
                </InputGroup.Append>
            </InputGroup>
            {warnings ? <p>{warnings}</p> : null}

            <Button className={styles.confirm} variant="outline-light" type="submit" onClick={() => { submitStage() }} >Zatwierdź</Button>
        </div>
    )
}


export default Categories