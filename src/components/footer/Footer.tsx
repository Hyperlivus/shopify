import {Box, Container} from "@mui/material";

function Footer() {
    return (
        <Box sx={{width:"100%", backgroundColor : "background.paper", padding:"20px"}} component="footer">
            <Container sx={{display:"flex", justifyContent:"flex-end", color : "common.white", fontSize:"18px"}}>
                <span>
                    Maked by Hyperlivus
                </span>
            </Container>
        </Box>
    )
}

export default Footer;