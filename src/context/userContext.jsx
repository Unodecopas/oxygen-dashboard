import React, { createContext, useContext, useEffect, useReducer } from 'react'

const LOCALSTORAGE_ITEM = 'userMiranda'

const initialState = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM)) || { logged: false, email: '', username: '', id: 0 }

export const UserContext = createContext(initialState)

export const useUser = () => {
  return useContext(UserContext)
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'logout':
      return { logged: false, email: '', username: '', id: 0 }
    case 'login':
      return { logged: true, email: action.value.email, username: action.value.username, id: action.value.id }
    case 'changeUsername':
      return { ...state, username: action.value }
    case 'changeEmail':
      return { ...state, email: action.value }
    default: {
      return state
    }
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
