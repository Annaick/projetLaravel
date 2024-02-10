import React from "react";
import ReactDOM from 'react-dom';
import { NextUIProvider } from '@nextui-org/react'
import clsx from 'clsx';

export function Base ({children}){

    return(
        <NextUIProvider>
        <div className="bg-gray-900 h-screen flex items-center justify-center">
            <main className="w-[800px] h-[90vh] shadow-lg rounded-xl overflow-auto relative z-10">
                    {children}
            </main>
            <div className="absolute w-full h-[40%] bg-indigo-500/80 top-0 bg-blend-overlay bg-[url('/background.png')]">

            </div>
        </div>
        </NextUIProvider>
    )
}