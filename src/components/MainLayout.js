import React, { useState } from 'react';
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
import { FaClipboard, FaBloggerB } from 'react-icons/fa';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <h2 className='text-white fs-5 text-center py-3 mb-0'>
                        <span className='sm-logo'>GM</span>
                        <span className='lg-logo'>Green Market</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key == "signout") {
                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-4' />,
                            label: 'Panel',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Clientes',
                        },
                        {
                            key: 'Catalog',
                            icon: <AiOutlineShoppingCart className='fs-4' />,
                            label: 'Catalogo',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Añadir Producto',
                                },
                                {
                                    key: 'list-product',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Listado de Productos',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Marca',
                                },
                                {
                                    key: 'list-brand',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Lista de Marcas',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Categoria',
                                },
                                {
                                    key: 'list-category',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Lista de Categorias',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Color',
                                },
                                {
                                    key: 'list-color',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Lista de Colores',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboard className='fs-4' />,
                            label: 'Ordenes',
                        },
                        {
                            key: 'blogs',
                            icon: <FaBloggerB className='fs-4' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Agregar Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Lista de Blogs',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Agregar Categoria Blog',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Lista de cat de blogs',
                                },
                            ],
                        },
                        {
                            key: 'enquiries',
                            icon: <FaClipboard className='fs-4' />,
                            label: 'Consultas',
                        },
                    ]}
                />
            </Sider>
            <Layout className='site-layout'>
                <Header
                    className='d-flex justify-content-between ps-1 pe-5'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='position-relative'>
                            <IoIosNotifications className='fs-4' />
                            <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                                3
                            </span>
                        </div>
                        <div
                            className='d-flex gap-3 align-items-center dropdown'
                        >
                            <div>
                                <img
                                    width={40}
                                    height={40}
                                    src='/greenmarket.png'
                                    alt=''
                                />
                            </div>
                            <div
                                role='button'
                                id="dropdownMenuLink"
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                <h5 className='mb-0'>Adrian Cisneros</h5>
                                <p className='mb-0'>adriancisneros@gmail.com</p>
                            </div>
                            <div
                                className='dropdown-menu'
                                aria-label='dropdownMenuLink'
                            >
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;