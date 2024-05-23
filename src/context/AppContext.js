import React, { createContext, useReducer } from 'react';
import ExpenseTotal from '../components/ExpenseTotal';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            const newTotalExpenses = state.expenses.reduce((total, currentExp) => total + currentExp.cost, 0) + action.payload.cost;
        
            if (newTotalExpenses <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        return { ...currentExp, cost: currentExp.cost + action.payload.cost };
                    }
                    return currentExp;
                });
        
                const updatedRemaining = state.budget - newTotalExpenses;
        
                return {
                    ...state,
                    expenses: updatedExpenses,
                    remaining: updatedRemaining,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return { ...state };
            }
        
        
            case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };
                case 'DECREASE_BY_10':
                    const updatedExpenses = state.expenses.map((currentExp) => {
                        if (currentExp.name === action.payload) {
                            const updatedCost = currentExp.cost - 10;
                            budget = state.budget + (currentExp.cost - updatedCost);
                            return { ...currentExp, cost: updatedCost };
                        }
                        return currentExp;
                    });
                
                    const updatedExpenseTotal = updatedExpenses.reduce((total, expense) => total + expense.cost, 0);
                    const updatedRemaining = state.budget - updatedExpenseTotal;
                
                    return {
                        ...state,
                        expenses: updatedExpenses,
                        ExpenseTotal: updatedExpenseTotal,
                        remaining: updatedRemaining,
                        budget: budget 
                    };
                
            action.type = "DONE";
            return {
                ...state,
                budget
              
            };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
            };
        case 'UPDATED_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            };
        case 'UPDATED_REMAINING':
            return {
                ...state,
                remaining: action.payload,
            };
      
     
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    remaining: 1040,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '$'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //let remaining = 0;
    //Budget - 


    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: state.remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
