import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteACoupon, getAllCoupon } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

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

const Couponlist = () => {
    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setcouponId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
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
                    <Link
                        to={`/admin/coupon/${couponState[i]._id}`}
                        className='fs-3 text-danger'
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(couponState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getAllCoupon());
        }, 100);
    }
    return (
        <div>
            <h3 className='mb-4 title'>Listado de Cupones</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCoupon(couponId);
                }}
                title='Estas seguro de que deseas eliminar este Cupon?'
            />
        </div>
    )
}

export default Couponlist;