
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <Box sx={{
            display: 'flex',
            marginRight: 'auto',
            alignItems: 'center',
            gap: '16px'
        }} >
            <Link to="/" >
                <img className="image-inverted" width={'30px'} height={'30px'} src="openai.png" alt="openai" />
            </Link>
            <Typography sx={{
                display: { md: "block", sm: "none", xs: "none" },
                mr: 'auto',
                fontWeight: 800,
                textShadow: "2px 2px 20px #000"
            }} >
                <span style={{ fontSize: "20px" }} >MERN</span>-GPT
            </Typography>
        </Box>
    )
}

export default Logo