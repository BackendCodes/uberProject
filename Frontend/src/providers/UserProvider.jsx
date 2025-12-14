import UserContext from "../context/UserContext";

const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default UserProvider;
