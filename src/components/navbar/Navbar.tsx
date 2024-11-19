"use client"
import {Badge, Box, Container, IconButton, Link, useTheme} from "@mui/material";
import Search from "@/components/search/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterButton from "@/components/filter-button/FilterButton";
import {useGetAllFromCart} from "@/context/CartProvider";

function Navbar(){
    const theme = useTheme();
    const cartItems = useGetAllFromCart()();

    return (
        <Box sx={{
            zIndex:"1",
            width:"100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
            padding : "12px",
        }}
        >
            <Container sx={{
                display:"flex",
                flex: "auto 1 auto",
                gap : "30px",
                alignItems:"center",

            }}>
                <Box sx={{display:"flex", gap:"30px"}}>
                    <Box component={"h1"} sx={{color:theme.palette.common.white}}>
                        Shopify
                    </Box>
                    <FilterButton/>
                </Box>
                <Box sx={{width:"100%"}}>
                    <Search/>
                </Box>
                <Box>
                    <Link href={"/cart"}>
                        <IconButton>
                            <Badge badgeContent={cartItems.length} color={"primary"} sx={{position:"relative"}}>
                                <ShoppingCartIcon sx={{color:theme.palette.common.white}} />
                            </Badge>
                        </IconButton>
                    </Link>


                </Box>

            </Container>
        </Box>
    )
}


export default Navbar;