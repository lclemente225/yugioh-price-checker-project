import { lazy } from "react";

export default function LazyLoad (path, namedExport) {
    return lazy(() => {
        const promise = import(path);
        if(namedExport == null){
            return promise
        } else {
            return promise.then(module => {
                return ({ default: module[namedExport] })
            })
        }
    })
};