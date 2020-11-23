import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { historyList } from '../history/historySlice';

const History = () => {

    const operationsList = useSelector(historyList);

    const operations = operationsList.map(operation => {

        const details = operation.submitedList.map(detail => ((
            <li>{`${detail.name} na kwotę ${detail.amount}`}</li>
        )))

        return (
            <li>
                <div>
                    <p>Sklep: {operation.shop}</p>
                    <p>Na kwotę: {operation.total}</p>
                    <p>Szczegółowo:</p>
                    <ul>
                        {details}
                    </ul>
                </div>
            </li>
        )
    }).reverse()

    return (
        <div>
            <ul>
                {operations}
            </ul>
        </div>
    );
}

export default History;