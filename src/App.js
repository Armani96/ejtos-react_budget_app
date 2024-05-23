import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AppProvider, AppContext } from './context/AppContext';

import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import RemainingBudget from './components/Remaining';


const App = () => {

    const {dispatch, currency} = useContext(AppContext);
    const [newCurrency, setNewCurrency] = useState(currency); // Initialize currency state with default value

    const currencyChange = (event) => {

        
        setNewCurrency(event.target.value); // Update currency state when selection changes
      // const currency = event.target.value;
        dispatch({
            type: 'UPDATED_CURRENCY',
            payload: event.target.value,
        });
    }
    useEffect(() => {
        console.log("Currency changed:", currency);

    }, [currency]);

    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget currency={currency}/>
                    </div>
                    <div className='col-sm'>
                        <RemainingBudget />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div>
                    <div className='col-sm'>
                    <select className="form-select currencySelect" value={newCurrency} onChange={(e) => currencyChange(e)}>
                        <option value="$">$ Dollar</option>
                        <option value="£">£ Pound</option>
                        <option value="€">€ Euro</option>
                        <option value="₹">₹ Ruppee</option>
                    </select>
                    </div>
                </div>
                <h3 className='mt-3'>Allocation</h3>
                <div className='row '>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Change allocation</h3>
                <div className='row mt-5'>
                    <div className='col-sm'>
                        <AllocationForm/>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;