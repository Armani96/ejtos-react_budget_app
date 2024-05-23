import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DECREASE_BY_10',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost}</td>
            <td>
                <FaPlusCircle 
                    size="1.5em" 
                    className='increase10' 
                    onClick={() => increaseAllocation(props.name)} 
                />
            </td>
            <td>
                <FaMinusCircle 
                    size='1.5em' 
                    className='decrease10' 
                    onClick={handleDeleteExpense} 
                />
            </td>
        </tr>
    );
};

export default ExpenseItem;
