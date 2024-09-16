import { createContext, useState, useEffect } from 'react'
export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    
    const [User, setUser] = useState(null);
    useEffect(() => {
        // Pega o usuário do localStorage quando o componente é montado ou a página é atualizada
        const savedUser = localStorage.getItem('User');
        console.log("LocalStorage: " + savedUser);
        if (savedUser && savedUser != User) {
            console.log("Pegando User do LocalStorage . . . ")
            setUser(JSON.parse(savedUser));
        }
    }, []); // Executado apenas uma vez na montagem do componente

  
    return(    
        <UserContext.Provider value={{User, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

