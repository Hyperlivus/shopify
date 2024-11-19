import {Box, Button, Checkbox, CircularProgress, Collapse, Divider, TextField, Typography} from "@mui/material";
import React, {createRef, useState} from "react";
import {Stack} from "@mui/system";
import CategoryApi from "@/api/category";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {TransitionGroup} from "react-transition-group";

export type SelectionButtonProps = {
    name : string;
    isSelected : boolean;
    onSelect : ()=>void;
}
function SelectionButton(props:SelectionButtonProps){

    return (
        <Button onClick={props.onSelect} sx={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer"}}>
            <Typography  variant={"subtitle1"} sx={{display:"flex", textTransform:"uppercase", color : "common.black"}}>
                {props.name}
            </Typography>
            <Checkbox checked={props.isSelected}/>

        </Button>
    )
}

export type FilterCardProps = {
    close : (items:string[])=>void;
}

export const CATEGORIES_KEY = "categories";

function FilterCard(props:FilterCardProps){
    const {data, isLoading} = useQuery<string[]>({
        queryKey : ["product"],
        queryFn : async ()=>{
            return await CategoryApi.getAll();
        }
    });
    const params = useSearchParams();
    const [selecteds, setSelecteds] = useState<string[]>(
        params.get(CATEGORIES_KEY)?.split(",") ?? [],
    );
    const [query, setQuery] = useState("");
    const inputRef = createRef<HTMLInputElement>();

    function onChange(){
        if(inputRef.current){
            const input = inputRef.current.querySelector("input");
            setQuery(input ? input.value : "");
        }
    }
    function reset(){
        setSelecteds([]);
    }
    function submit(){
        props.close(selecteds)
    }

    return (
        <Box sx={{display:"flex", flexDirection:"column", gap : "20px", backgroundColor:"primary.light", padding:"10px"}}>
            <TextField
                ref={inputRef}
                value={query}
                placeholder={"Category.."}
                sx={{padding:"4px !important"}}
                onChange={onChange}
            />
            <Box sx={{display:"flex", flexDirection:"column", gap:"10px", width:"500px"}}>
                <Stack sx={{maxHeight:"200px", overflowY:"scroll", flexDirection:"column"}} divider={<Divider/>}>
                    <TransitionGroup>
                        {

                                data?.map(item => {
                                    const isSelected = selecteds.includes(item);
                                    if (!(query.length == 0 || item.includes(query.toLowerCase()))) {
                                        return;
                                    }
                                    return (
                                        <Collapse  key={item} >
                                            <SelectionButton
                                                name={item}
                                                isSelected={isSelected}
                                                onSelect={()=>{
                                                    if (!isSelected) {
                                                        setSelecteds([...selecteds, item]);
                                                    } else {
                                                        const copy = [...selecteds];
                                                        const index = copy.indexOf(item);
                                                        copy.splice(index, 1);
                                                        setSelecteds(copy);
                                                    }
                                                }}
                                            />
                                        </Collapse>

                                    )
                                })
                        }
                    </TransitionGroup>

                </Stack>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Button onClick={reset} variant={"contained"} sx={{backgroundColor:"error.main"}}>
                    Reset
                </Button>
                <Button onClick={submit} variant={"contained"}>
                    Ok
                </Button>
            </Box>

        </Box>
    )
}

export default FilterCard;