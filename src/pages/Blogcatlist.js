import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteABlogCat, getCategories, resetState } from '../features/bcategory/bcategorySlice';
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
        title: 'Acciones',
        dataIndex: 'action',
    },
];

const Bloglist = () => {
    const [open, setOpen] = useState(false);
    const [blogCatId, setblogCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setblogCatId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, []);
    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const data1 = [];
    for (let i = 0; i < bCatState.length; i++) {
        data1.push({
            key: i + 1,
            name: bCatState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/blog-category/${bCatState[i]._id}`}
                        className='fs-3 text-danger'
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(bCatState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const deleteBlogCategory = (e) => {
        dispatch(deleteABlogCat(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    }
    return (
        <div>
            <h3 className='mb-4 title'>Listas de Categorias de Blogs</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBlogCategory(blogCatId);
                }}
                title='Estas seguro de que deseas eliminar esta Categoria de Blog?'
            />
        </div>
    )
}

export default Bloglist