import {createContext,useState}from 'react'

export const ContextStore=createContext(null);
function ContextApi({children}) {
    const[passCon,setPassCont]=useState('Hello context')
    const hello='This Is Also   Context'
  return (
    <ContextStore.Provider value={{passCon, hello}}>
    {children}
    </ContextStore.Provider>

  )
}

export default ContextApi
