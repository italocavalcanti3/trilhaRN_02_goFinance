import { createContext, ReactNode, useContext } from 'react';


interface AuthProviderProps{
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '1',
    name: 'Italo Cavalcanti',
    email: 'italobc93@gmail.com',
    photo: 'https://github.com/italocavalcanti3.png',

  }

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }