
import React, { useContext, useState } from 'react';
import { AppContext} from '../context/AppContext';


const Budget = () => {
    const { budget, expenses, dispatch, currency} = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
  
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);
    const handleBudgetChange = (event) => {
        if (event.target.value > 20000) alert("Budget can't exceed 20.000");
        if (event.target.value <= 20000 && event.target.value >= totalExpenses) {
            setNewBudget(event.target.value);
            const updatedRemaining = event.target.value - totalExpenses;
            dispatch({
                type: 'UPDATED_REMAINING',
                payload: updatedRemaining,
            });

        }
        if (event.target.value < totalExpenses) alert("Budget can't be under amount spent.")

    }
    return (
<div className='alert alert-secondary'>
<span>Budget: {currency}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;