import React, { createContext, useContext, useEffect, useReducer } from 'react'

const LOCALSTORAGE_ITEM = 'userMiranda'

export const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}
const initialState = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM)) || { logged: false, email: '', username: '', id: 0 }

const reducer = (state, action) => {
  switch (action.type) {
    case 'logout':
      return { ...state, logged: false, email: '', username: '', id: 0 }
    case 'login':
      return { ...state, logged: true, email: action.value.email, username: action.value.username, id: action.value.id }
    case 'changeUsername':
      return { ...state, username: action.value }
    case 'changeEmail':
      return { ...state, email: action.value }
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_ITEM, JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
