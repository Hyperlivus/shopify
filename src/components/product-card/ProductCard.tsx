import {Box, Card, IconButton, Link, Rating, useTheme} from "@mui/material";
import {ProductType} from "@/types/Product";
import Category from "@/components/category/Category";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {useAddToCart, useGetAllFromCart, useRemoveFromCart} from "@/context/CartProvider";

export type ProductCardProps = {
    product : ProductType;
}
export type AutoLoadCardProps = {
    id : number;
}

function ProductCard(props:ProductCardProps){
    const theme = useTheme();
    const cartProducts = useGetAllFromCart()();
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();



    const add = ()=>{
            addToCart(props.product);

    }
    const remove = ()=>{
        removeFromCart(props.product);
    }

    return (
        <Card sx={{
            backgroundColor: theme.palette.background.default,
            padding : "10px",
            display:"flex",
            flexDirection: "column",
        }}>
            <Box sx={{position:"relative"}}>
                <img width={"100%"} style={{aspectRatio: "1/1"}} src={props.product.images[0]} alt={""}/>
                <Box sx={{
                    position:"absolute", bottom:"20px", right:"20px",
                    width: "64px", height : "64px", borderRadius:"50%",
                    display: "flex", alignItems : "center", justifyContent:"center",
                    backgroundColor:"primary.main", color : "primary.light",
                    fontSize:"19px",
                }}>
                    %{(props.product.discountPercentage.toFixed(1))}
                </Box>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", flex :"auto 1"}}>
                <Box sx={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start", flexGrow : 1}}>
                    <Link
                        sx={{
                            fontSize : "18px", fontFamily:"Roboto,sans-serif", textAlign:"center",
                            color : theme.palette.primary.dark,
                            alignSelf: "center",
                        }}
                        underline={"hover"} href={`/product/${props.product.id}`}>
                        {props.product.title}
                    </Link>
                    <Box sx={{fontFamily:"Roboto,sans-serif"}} component={"h3"}>Price : {props.product.price}</Box>
                    <Box sx={{fontFamily:"Roboto,sans-serif"}} component={"h4"}>Brand : {props.product.brand}</Box>
                    <Rating name="read-only" value={props.product.rating}  readOnly/>
                    <Box sx={{fontFamily:"Roboto,sans-serif", fontSize : "0.95em"}} component={"span"}>
                        {props.product.description}
                    </Box>
                    <Category name={props.product.category}/>
                </Box>
                <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                    {
                        !cartProducts.includes(props.product.id) ?
                            <IconButton onClick={add}>
                                <AddShoppingCartIcon sx={{color:"background.paper"}}/>
                            </IconButton> : <IconButton onClick={remove}>
                                <RemoveShoppingCartIcon sx={{color:"background.paper"}}/>
                            </IconButton>
                    }
                </Box>
            </Box>

        </Card>
    )
}

export default ProductCard;