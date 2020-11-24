import React from 'react';
import { useSelector } from 'react-redux';
import styles from './History.module.css';
import { Accordion, Card } from 'react-bootstrap'

import { historyList } from '../history/historySlice';

const History = () => {

    const operationsList = useSelector(historyList);

    const operations = operationsList.map((operation, index) => {

        const details = operation.submitedList.map((detail, index) => ((
            <p>{`${detail.name} na kwotę ${detail.amount} PLN`}</p>
        )))

        return (
            <Accordion>
                <Card className={styles.dark}>
                    <Card.Header >
                        <p>Sklep: {operation.shop}</p>
                        <p>Na kwotę: {operation.total} PLN</p>
                    </Card.Header>
                    <Accordion.Toggle className={styles.accordionToggle} eventKey={`${index}`} >
                        <p>Wydatki szczegółowe:</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`} >
                        <Card.Body>{details}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }).reverse()

    return (
        <div className={styles.history}>
            <h2>Historia</h2>
            <ul>
                {operations}
            </ul>
        </div>
    );
}

export default History;