import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getEnquiries } from '../features/enquiry/enquirySlice';

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
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Telefono',
        dataIndex: 'mobile',
    },
    {
        title: 'Estado',
        dataIndex: 'status',
    },
    {
        title: 'Accion',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
    }, []);
    const enqState = useSelector((state) => state.enquiry.enquiries);
    const data1 = [];
    for (let i = 0; i < enqState.length; i++) {
        data1.push({
            key: i + 1,
            name: enqState[i].name,
            email: enqState[i].email,
            mobile: enqState[i].mobile,
            status: (
                <>
                    <select name='' className='form-control form-select' id=''>
                        <option value=''>Establecer Estado</option>
                    </select>
                </>
            ),
            action: (
                <>
                    <Link className='ms-3 fs-3 text-danger' to='/'>
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Consultas</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Enquiries