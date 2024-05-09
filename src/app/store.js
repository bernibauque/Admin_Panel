/*import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pCategory: pcategoryReducer,
        bCategory: bcategoryReducer,
        blogs: blogReducer,
        enquiry: enquiryReducer,
        upload: uploadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['createNewblogcat/fulfilled', 'auth/login/rejected'],
                ignoredPaths: ['payload'],
            },
        }),
});

export default store;*/

/* ORIGINAL*/
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pCategory: pcategoryReducer,
        bCategory: bcategoryReducer,
        blogs: blogReducer,
        enquiry: enquiryReducer,
        upload: uploadReducer,
    },
});