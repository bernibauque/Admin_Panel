import React, { useEffect } from 'react'
import { Table } from "antd";
import { getOrders } from "../features/auth/authSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const orderState = useSelector((state) => state.auth.orders);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].title,
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
            <h3 className='mb-4 title'>Ordenes</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders;