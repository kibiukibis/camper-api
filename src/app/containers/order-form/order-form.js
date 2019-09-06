import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ADD_NAME = "ADD_NAME";
const ADD_SURNAME = "ADD_SURNAME";
const ADD_START_DATE = "ADD_START_DATE";
const ADD_END_DATE = "ADD_END_DATE";

const initialState = {
    name: '',
    surname: '',
    start_date: new Date(),
    end_date: new Date()
};

function orderReducer(state, action) {
    switch (action.type) {
        case ADD_NAME:
            return {
                name: action.name,
                surname: state.surname,
                start_date: state.start_date,
                end_date: state.end_date
            };
        case ADD_SURNAME:
            return {
                name: state.name,
                surname: action.surname,
                start_date: state.start_date,
                end_date: state.end_date
            };
        case ADD_START_DATE:
            return {
                name: state.name,
                surname: state.surname,
                start_date: action.start_date,
                end_date: state.end_date
            };
        case ADD_END_DATE:
            return {
                name: state.name,
                surname: state.surname,
                start_date: state.start_date,
                end_date: action.end_date
            };
        default:
            return initialState;
    }
}

const OrderForm = () => {

    const [order, dispatch] = React.useReducer(orderReducer, initialState);

    console.log(order);

    const handleSubmit = () => {
        fetch('api/orders/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: order.name,
                surname: order.surname,
                start_date: order.start_date,
                end_date: order.end_date,
                confirmed: false
            })
        })
            .then(resp =>resp.json())
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" onChange={(event) => dispatch({ type: ADD_NAME, name: event.target.value })} required />
                <label>Last Name</label>
                <input type="text" name="lastName" onChange={(event) => dispatch({ type: ADD_SURNAME, surname: event.target.value })} required />
            </div>
                <div>
                    <label>Start date</label>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={order.start_date}
                        onChange={(date) => dispatch({ type: ADD_START_DATE, start_date: date })}
                    />
                </div>
                <div>
                    <label>End date</label>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={order.end_date}
                        onChange={(date) => dispatch({ type: ADD_END_DATE, end_date: date })}
                    />
                </div>
            <button type="submit">Send request</button>
        </form>
    )
};

export default OrderForm;
