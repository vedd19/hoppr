import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: '',
        },
        email: '',
    })
    const [isLogo, setIsLogo] = useState(true);



    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser, isLogo, setIsLogo }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}
