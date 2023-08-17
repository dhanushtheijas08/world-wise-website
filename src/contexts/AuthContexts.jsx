import { createContext, useContext } from "react";

const CreateAuthContexts = createContext();
function AuthContexts({ children }) {
  return <CreateAuthContexts.Provider>{children}</CreateAuthContexts.Provider>;
}
function useAuthContext() {
  const context = useContext(CreateAuthContexts);
  return context;
}
export default AuthContexts;
export { useAuthContext };
