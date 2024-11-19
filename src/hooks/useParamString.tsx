"use client"

import {useCallback} from "react";
import {useSearchParams} from "next/navigation";


export type Params = {
    [key: string]: string;
}
function useParamString() {
    const searchParams = useSearchParams();

    return useCallback(
        (params:Params) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            for (const  key in params){
                newSearchParams.set(key, params[key]);
            }
            return newSearchParams.toString();
        },
        [searchParams]
    );

}
export default useParamString;