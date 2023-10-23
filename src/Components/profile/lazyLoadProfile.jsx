import { lazy } from "react";

export default function LazyLoad (path, namedExport) {
    try{
        return lazy(() => {
        const promise = import(path);
        if(namedExport == null){
            return promise
        } else {
            return promise.then(module => {
                return { default: module[namedExport] }
            })
        }
    })
    }catch(error){
        console.log("didn't lazy load correctly", error)
    }
};