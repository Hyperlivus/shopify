"use client"
import React, {createContext, useContext, useEffect, useState} from "react";
import {ProductType} from "@/types/Product";

const OUT_OF_CONTEXT = "Using this hook out of cart context not allowed";

const context = createContext({
    addToCart: (p:ProductType) => {},
    removeProduct: (p:ProductType) => {},
    getIds : ():number[]=>[],
});

export function useAddToCart() {
    const ctx = useContext(context);
    if (ctx == null){
        throw new Error(OUT_OF_CONTEXT);
    }
    return ctx.addToCart;
}
export function useRemoveFromCart() {
    const ctx = useContext(context);
    if (ctx == null){
        throw new Error(OUT_OF_CONTEXT);
    }
    return ctx.removeProduct;
}
export function useGetAllFromCart() {
    const ctx = useContext(context);
    if (ctx == null){
        throw new Error(OUT_OF_CONTEXT);
    }
    return ctx.getIds;
}

const PRODUCTS_KEY = "products";


function CartProvider(props:{children:React.ReactNode}) {


    const loadProducts = ()=>{
        let idString = localStorage.getItem(PRODUCTS_KEY);
        if (idString == null) {
            idString = "";
        }

        if (idString.length === 0){
            return  [];
        } else {
            return (idString.split("-").map(id => {
                return Number(id);
            }));
        }
    }

    const [productIds, setProductsIds] = useState<number[]>(loadProducts());
    const [loaded, setLoaded] = useState<boolean>(false);
    const saveProducts = ()=>{
        if (productIds.length == 0){
            localStorage.setItem(PRODUCTS_KEY, "");
        }
        const idString = productIds.join("-");
        localStorage.setItem(PRODUCTS_KEY, idString);
    }

    useEffect(()=>{
        saveProducts();
    }, [productIds]);

    const value ={
        addToCart: (product:ProductType) => {
            setProductsIds([...productIds, product.id]);
        },
        removeProduct: (product:ProductType) => {
            setProductsIds(productIds.filter((id) => {
                return id != product.id;
            }));
        },

        getIds(){
            return [...productIds];
        }
    };

    return (
        <context.Provider value={value}>
            {props.children}
        </context.Provider >
    )
}

export default CartProvider;