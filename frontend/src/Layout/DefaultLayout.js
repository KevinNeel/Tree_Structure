import React from 'react'
import { Route, Routes } from "react-router-dom";

import protectedRoutes from '../routes/protectedRoute'

const DefaultLayout = () => {
    return (
        <>
            <Routes>
                {protectedRoutes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Routes>
        </>
    )
}

export default DefaultLayout