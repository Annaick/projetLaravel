import React from "react";
import ReactDOM from 'react-dom';
import { NextUIProvider } from '@nextui-org/react'

export function Base ({children}){

    return(
        <NextUIProvider>
        <div className="bg-gray-200 h-screen flex items-center justify-center">
            <main className="w-[700px] h-[90vh] shadow-lg rounded-2xl overflow-auto relative z-10">
                    {children}
            </main>
            <div className="absolute w-full h-[40%] bg-purple-500 top-0 bg-blend-overlay">

            </div>
        </div>
        </NextUIProvider>
    )
}