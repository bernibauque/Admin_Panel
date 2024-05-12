import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getAllCoupon } from '../features/coupon/couponSlice';

const columns = [
    {
        title: 'Numero',
        dataIndex: 'key',
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Descuento',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount.length - b.discount.length,
    },
    {
        title: 'Caducidad',
        dataIndex: 'expiry',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Acciones',
        dataIndex: 'action',
    },
];

const Brandlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCoupon());
    }, []);
    const couponState = useSelector((state) => state.coupon.coupons);
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
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
            <h3 className='mb-4 title'>Listado de Cupones</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Brandlist;