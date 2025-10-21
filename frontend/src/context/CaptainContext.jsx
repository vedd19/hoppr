import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {

    // const captain = {
    //     fullname: {
    //         firstname: '',
    //         lastname: '',
    //     },
    //     email: '',
    // }


    const [captain, setCaptain] = useState(null);
    const value = { captain, setCaptain };


    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}
