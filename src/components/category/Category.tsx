import {Box} from "@mui/material";

export type CategoryProps = {
    name : string;
}
function Category(props:CategoryProps){
    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            padding : "7px 10px",
            borderRadius:"5px",
            backgroundColor: "primary.light",
            fontWeight: "bold",
            fontSize :"16px",

        }}>
            <Box sx={{textTransform:"uppercase"}}>
                {props.name}
            </Box>
        </Box>
    )
}

export default Category;