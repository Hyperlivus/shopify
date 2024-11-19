import {Box, Button, Card, Rating, Typography} from "@mui/material";
import {ProductType} from "@/types/Product";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Category from "@/components/category/Category";
import {useAddToCart, useGetAllFromCart, useRemoveFromCart} from "@/context/CartProvider";

export type ProductProps = {
    product : ProductType;
}
function Product(props:ProductProps) {
    const cartProducts = useGetAllFromCart()();

    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();

    const add = () =>{
        addToCart(props.product);
    }
    const remove =()=>{
        removeFromCart(props.product);
    }

    const isInCart = cartProducts.includes(props.product.id);
    return (
        <Card sx={{
            display:"flex", gap : "20px",
            width:"100%", padding:"20px",
            backgroundColor: "background.default",
        }}>
            <Box className={"left"} sx={{display:"flex", flexDirection:"column"}}>
                <img
                    src={props.product.images[0]}
                    alt={""}
                    width={512}
                    height={512}
                />
            </Box>
            <Box className={"right"} sx={{display:"flex", flexDirection:"column", flexGrow:1, gap:"20px"}}>
                <Box sx={{display:"flex", flexDirection:"column", gap:"12px"}}>
                    <Box className={"title"} component={"h2"}>
                        {props.product.title}
                    </Box>
                    <Typography variant={"h6"}>
                        Brand : {props.product.brand}
                    </Typography>
                    <Category name={props.product.category}/>
                    <Box className={"desc"}  sx={{fontSize:"17px"}} component={"span"}>
                        {props.product.description}
                    </Box>

                    <Rating name={"read-only"} value={props.product.rating} readOnly/>
                </Box>

                <Card variant={"outlined"} sx={{
                    padding:"10px", backgroundColor:"transparent",
                    display:"flex", justifyContent:"space-between", alignItems:"center", gap :"20px"
                }}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"10px"}}>
                        {
                            props.product.stock != 0 ?
                            <Box component={"span"} sx={{fontFamily:"Roboto,sans-serif", color:"success.main"}}>
                                in stock({props.product.stock})
                            </Box>: <Box component={"span"} sx={{fontFamily:"Roboto,sans-serif", color:"danger.main"}}>not found</Box>
                        }
                        <Box sx={{display:"flex", gap : "15px", alignItems:"center"}}>
                            <Box component={"span"} sx={{fontFamily:"Roboto,sans-serif", fontSize:"28px"}}>
                                ${props.product.price}
                            </Box>
                            <Box sx={{padding:"5px 7px",  backgroundColor:"primary.main"}}>
                                <Box component={"div"} sx={{
                                    fontFamily:"Roboto,sans-serif", fontSize:"18px", color : "common.white",
                                }}>
                                    -%{props.product.discountPercentage}
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                    {
                        !isInCart ?
                        <Button onClick={add}  variant={"contained"}
                                sx={{display:"flex", gap:"20px", color:"primary.light", fontSize:"16px", alignItems:"center"}}
                        >
                            <ShoppingCartIcon/>
                            To Cart
                        </Button> :
                            <Button onClick={remove} variant={"contained"} color={"error"}
                                    sx={{display:"flex", gap:"20px", color:"primary.light", fontSize:"16px", alignItems:"center"}}>
                                <ShoppingCartIcon/>
                                Remove
                            </Button>

                    }

                </Card>

            </Box>
        </Card>
    )
}

export default Product;