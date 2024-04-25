import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getCategories } from '../features/pcategory/pcategorySlice';

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
        title: 'Acciones',
        dataIndex: 'action',
    },
];

const Categorylist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    const pCatStat = useSelector((state) => state.pCategory.pCategories);
    const data1 = [];
    for (let i = 0; i < pCatStat.length; i++) {
        data1.push({
            key: i + 1,
            name: pCatStat[i].title,
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
            <h3 className='mb-4 title'>Productos por Categoria</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Categorylist;