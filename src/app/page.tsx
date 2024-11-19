"use client"
import {Box, CircularProgress, Container, Pagination} from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
import {useEffect, useState} from "react";
import ProductList from "@/components/product-list/ProductList";
import Footer from "@/components/footer/Footer";
import {useRouter, useSearchParams} from "next/navigation";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import ProductsApi from "@/api/products";
import {ProductType} from "@/types/Product";
import {QUERY_KEY} from "@/components/search/Search";
import useParamString from "@/hooks/useParamString";
import {CATEGORIES_KEY} from "@/components/filter-button/FilterCard";


const PAGE = "page";

export default function Home() {
    const params = useSearchParams();
    const paramPage = Number(params.get(PAGE));
    const query = params.get(QUERY_KEY);

    const MAX_PAGE = 33;

    const updatePage = ()=>{
        return ((isNaN(paramPage) || paramPage < 1 || paramPage > MAX_PAGE) ? 1 : paramPage);
    }
    const updateCategories = ()=>{
        return params.get(CATEGORIES_KEY)?.split(",") ?? [];
    }
    const setParam = useParamString();

    const [page, setPage] = useState(
        updatePage(),
    );
    const [categories, setCategories] = useState(
        updateCategories(),
    );

    const {isLoading, data: pageProducts, isFetching} = useQuery<ProductType[]>({
        queryKey : ['products', page, query, categories.join(",")],
        queryFn : async ({queryKey})=>{
            const currentPage = queryKey[1] as number;
            const currentQuery = queryKey[2] ? queryKey[2] as string : undefined;

            return await ProductsApi.getAll({
                page: currentPage,
                itemsInPage: 6,
                query: currentQuery,
            });
        },
        placeholderData : keepPreviousData,
    });
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const param = setParam({
            page : "1",
        });
        router.push(`?${param}`);
    }, [query]);
    useEffect(() => {
        setPage(updatePage());
        console.log(isLoading);
    }, [paramPage]);
    useEffect(() => {

        if (pageProducts != undefined) {
            setProducts(pageProducts as ProductType[]);
        }
    }, [pageProducts]);
    useEffect(() => {
        const path = setParam({
            page : String(page),
        });
        router.push(`?${path}`);
    }, [page]);


    const router = useRouter();

    function onChange(event:any, page:number){
        setPage(page);
    }


    return (
        <Box sx={{
            backgroundColor: "primary.light",
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flex : "auto 1",
            flexDirection: 'column',
            gap : "20px",
        }}>
            <Navbar/>
            <Box sx={{flexGrow:"1", display:"flex", flexDirection:"column", flex : "1 auto", gap:"20px"}}>
                <Container
                    sx={{flexGrow:"1", display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", justifyContent:"space-between"}}>
                    <Box component={"h1"}>
                        Products
                    </Box>
                    {
                        isFetching ? <CircularProgress color="inherit" /> : <ProductList products={products}/>
                    }
                    <Pagination
                        page={page}
                        onChange={onChange}
                        color={"primary"}
                        count={MAX_PAGE}
                    />
                </Container>
                <Footer/>
            </Box>
    </Box>
  );
}
