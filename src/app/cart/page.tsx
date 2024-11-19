"use client"
import {Box, CircularProgress, Container} from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
import {useGetAllFromCart} from "@/context/CartProvider";
import ProductList from "@/components/product-list/ProductList";
import {useQuery} from "@tanstack/react-query";
import {ProductType} from "@/types/Product";
import ProductsApi from "@/api/products";
import {useEffect, useState} from "react";

export default function CartPage(){
    const getAll = useGetAllFromCart();
    const ids = getAll();



    const {data, isLoading, refetch} = useQuery<ProductType[]>({
        queryKey : ["products_id", ids],
        queryFn : ({queryKey})=>{
            const currentIds = queryKey[1] as number[];
            return ProductsApi.getByProducts(currentIds);
        },
    });
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        if (data != undefined) {
            setProducts(data);
        }
    }, [data]);





    return (
        <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"primary.light", minHeight:"100vh", flex : "auto 1", gap : "32px"}}>
            <Navbar/>
            <Container sx={{flexGrow:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                {
                    ids.length > 0 ? (
                        isLoading ? <CircularProgress/> :  <ProductList products={products}/>
                    ) : <Box sx={{fontSize:"3.2em"}} component={"h4"}>Cart is empty</Box>
                }


            </Container>
        </Box>
    )
}