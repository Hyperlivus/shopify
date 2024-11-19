import {ReviewType} from "@/types/Product";
import {Box, Card, Rating, Typography} from "@mui/material";

export type ReviewProps = {
    review : ReviewType;
}
function Review(props:ReviewProps) {
    return (
        <Card variant={"outlined"} sx={{
            backgroundColor:"transparent",
            display:"flex", flexDirection:"column",
            padding:"20px"
        }}>
            <Box sx={{display:"flex", gap : "10px", justifyContent:"space-between"}}>
                <Box sx={{display:"flex", gap : "10px"}}>
                    <Typography variant={"body1"}>
                        {props.review.reviewerName}
                    </Typography>
                    <Typography variant={"body2"}>
                        {props.review.reviewerEmail}
                    </Typography>
                </Box>
            </Box>
            <Typography sx={{marginTop:"10px"}}>
                {props.review.comment}
            </Typography>
            <Rating sx={{marginTop:"5px"}} value={props.review.rating} readOnly/>


        </Card>
    )
}

export default Review;