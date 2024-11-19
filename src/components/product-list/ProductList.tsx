import {ProductType} from "@/types/Product";
import {Box} from "@mui/material";
import ProductCard from "@/components/product-card/ProductCard";

export type ProductListProps = {
    products : ProductType[];
}
function ProductList(props:ProductListProps){
    return (
        <Box sx={{display:"grid", gridTemplateColumns:`repeat(3, 1fr)`, gap : "20px"}}>
            {
                props.products.map((product:ProductType) => {
                    return (
                        <ProductCard key={product.id} product={product}/>
                    )
                })
            }
        </Box>
    )
}

export default ProductList;