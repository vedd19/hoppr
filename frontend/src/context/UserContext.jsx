import React, { createContext } from 'react'

export const UserDataContext = createContext()

export const UserContext = ({ children }) => {

    return (
        <div>
            <UserDataContext.Provider>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}
