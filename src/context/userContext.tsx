import React, { createContext, useContext, useEffect, useReducer } from 'react'

interface Props {
  children: JSX.Element
}
interface State {
  logged: boolean, 
  email: string, 
  username: string, 
  id: number
}
enum ActionsTypes {
  login = 'login',
  logout = 'logout',
  changeUsername = 'changeUsername',
  changeEmail = 'changeEmail',
}

interface Action {
  type: ActionsTypes
  value: {
    logged?: boolean, 
    email?: string, 
    username?: string, 
    id?: number
  }
}

const LOCALSTORAGE_ITEM = 'userMiranda'
const initialState = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM) as string) || { logged: false, email: '', username: '', id: 0 }

export const UserContext = createContext(initialState)

export const useUser = () => {
  return useContext(UserContext)
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'logout':
      return { logged: false, email: '', username: '', id: 0 }
    case 'login':
      return { logged: true, email: action.value.email as string, username: action.value.username as string, id: action.value.id as number }
    case 'changeUsername':
      return { ...state, username: action.value as string }
    case 'changeEmail':
      return { ...state, email: action.value as string }
    default: {
      return state
    }
  }
}

export const UserProvider= ({ children }: Props) => {
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
