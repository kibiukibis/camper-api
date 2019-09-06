import React, { useEffect, useState } from 'react';

const Admin = () => {
    const [orderList, setOrderList] = useState(null);

    useEffect(() => {
        fetch(`api/orders/`)
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data) {
                setOrderList(JSON.parse(JSON.stringify(data)));
            })
    }, []);

    const handleConfirmOrder = (event) => {
        const id = event.target.id;
        fetch(`api/orders/${id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({confirmed: true})
        })
            .then(resp =>resp.json())
    };

    return (
        <ul>
            {orderList && orderList.map((item, key) => {
                return (
                    <li key={key}>
                        <span>{item.name} </span>
                        <span>{item.surname} </span>
                        <span>{item.start_date} </span>
                        <span>{item.end_date} </span>
                        <button id={item._id} onClick={handleConfirmOrder}>confirm order</button>
                    </li>
            )})
            }

        </ul>
    );
};

export default Admin;
