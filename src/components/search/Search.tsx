'use client'

import {Box, IconButton, useTheme} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {createRef, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import useParamString from "@/hooks/useParamString";

export const QUERY_KEY = "query";

function Search(){

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentQuery = searchParams.get(QUERY_KEY) ?? "";
    const setParam = useParamString();

    const inputRef = createRef<HTMLInputElement>();
    const [query, setQuery] = useState(currentQuery);



    function onChange(){
        if (inputRef.current){
            setQuery(inputRef.current.value);
        }
    }

    useEffect(() => {
        setQuery(currentQuery);
    }, [currentQuery]);

    const theme = useTheme();
    const searchStyle = {
        width : "100%",
        display : "flex",
        flex : "1 auto",
        background: theme.palette.primary.light,
        padding : "5px 10px",
        borderRadius : "5px",
        outline: "solid 1px primary.main",
        input : {
            width: "100%",
            fontSize : "1em",
            padding: "0",
            borderStyle : "none",
            background: "transparent",
            outline: "none",
        },
        ".button" : {

        }
    }

    function submit(){
        router.push("?"+setParam({
            query : query,
        }));
    }
    function onKeyPress(ev){
        if (ev.key === "Enter"){
            submit();
        }
    }
    return (
        <Box sx={searchStyle}>
            <input
                onKeyDown={onKeyPress}
                onChange={onChange}
                value={query}
                ref={inputRef}
                placeholder={"Search.."}
            />
            <IconButton onClick={submit} className={"button"}>
                <SearchIcon sx={{width:20, height:20}} className={"icon"}/>
            </IconButton>
        </Box>
    )
}

export default Search;