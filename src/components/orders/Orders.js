import React, { useState } from 'react'
import { useEffect } from 'react';
import './Orders.css'
import {db} from '../../firebase'
import Order from './Order';
import { useStateValue } from '../../StateProvider';
import Header from '../../Header'

function Orders() {
    const [orders, setOrders] = useState([]);
    const [{basket, user}, dispatch] = useStateValue();

    useEffect(() => {
        if(user){
        db.collection('users').doc(user?.uid)
        .collection('orders').orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })))
        ))}else{
            setOrders([])
        }
    }, [user])
        
    return (
        <>
        <Header></Header>
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}></Order>
                ))}
            </div>
        </div>
        </>
    )
}

export default Orders
