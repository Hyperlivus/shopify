import {
    Button,
    Dialog,
} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import React, {useState} from "react";
import FilterCard from "@/components/filter-button/FilterCard";
import useParamString from "@/hooks/useParamString";
import {useRouter} from "next/navigation";


function FilterButton(){
    const [open, setOpen] = useState(false);
    const id = open ? 'filter' : undefined;
    const setParam = useParamString();

    const router = useRouter();

    function onClick(){
        setOpen(true);
    }
    function close(items:string[]){
        setOpen(false);
        const paramsString = setParam({
            categories : items.join(","),
        });
        router.push(`?${paramsString}`);

    }

    return (
        <>
            <Button aria-describedby={id} sx={{
                color:"common.white",
                display:"flex", gap:"10px",
                padding : "8px 10px",
                position:"relative",
            }} variant={"contained"} onClick={onClick}>
                <CategoryIcon/>
                Categories
            </Button>
            <Dialog sx={{
                zIndex:1, "root":{
                    backgroundColor: "common.white",
                },
            }} open={open} id={id}>
                   <FilterCard close={close}/>
            </Dialog>
        </>

    )
}

export default FilterButton;