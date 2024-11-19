"use client"
import {Box, Card, CircularProgress, Container, Divider, Typography} from "@mui/material";
import React from "react";
import {ProductType} from "@/types/Product";
import {notFound} from "next/navigation";
import Product from "@/app/product/[slug]/card";
import Review from "@/components/review/Review";
import {useQuery} from "@tanstack/react-query";
import ProductsApi from "@/api/products";

export default function ProductPage({params}:{
    params:Promise<{slug:string}>
}) {
    const id = React.use(params).slug;

    const {data, isFetching, isError} = useQuery<ProductType>({
        queryKey : ["product", id],
        queryFn : async ({queryKey})=>{
            const id = queryKey[1] as number;
            console.log(id);
            return await ProductsApi.getOne(id);
        },
    })


    return (
        <Box sx={{width:"100%", minHeight:"100vh", display:"flex", backgroundColor: "primary.light"}}>
            <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center", gap : "20px"}}>
                {
                    isFetching ?
                        <CircularProgress color={"inherit"}/> :
                        (
                            !isError ? <Product product={data as ProductType}/> : notFound()
                        )
                }
                <Card sx={{
                    display:"flex", flexDirection:"column", backgroundColor: "background.default",
                    padding : "10px"
                }}>
                    <Typography   variant={"h5"}>
                        Reviews
                    </Typography>
                    <Divider sx={{margin:"20px 0"}}/>
                    <Box sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        {
                            data?.reviews.map(review=>{
                                return (
                                    <Review review={review} key={review.reviewerName}/>
                                )
                            })
                        }
                    </Box>
                </Card>
            </Container>

        </Box>
    )
}