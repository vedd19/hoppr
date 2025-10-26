import React, { useState } from 'react'

import { CaptainDataContext } from './CaptainDataContext';

const CaptainContext = ({ children }) => {

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

export default CaptainContext;
