import React, { useEffect } from 'react'
import { Table } from "antd";
import { getOrderByUser, getOrders } from "../features/auth/authSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
    {
        title: 'Numero',
        dataIndex: 'key',
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
    },
    {
        title: 'Producto',
        dataIndex: 'product',
    },
    {
        title: 'Monto',
        dataIndex: 'amount',
    },
    {
        title: 'Fecha',
        dataIndex: 'date',
    },
    {
        title: 'Acciones',
        dataIndex: 'action',
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderByUser(userId));
    }, []);
    const orderState = useSelector((state) => state.auth.orders);

    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].orderby.firstname,
            product:
                <Link to={`/admin/order/${orderState[i].orderby._id}`}>
                    Ver Orden de usuario
                </Link>,
            amount: orderState[i].paymentIntent.amount,
            date: new Date(orderState[i].createdAt).toLocaleString(),
            action: (
                <>
                    <Link to='/' className='fs-3 text-danger'>
                        <BiEdit />
                    </Link>
                    <Link className='ms-3 fs-3 text-danger' to='/'>
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Ver Orden</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default ViewOrder;