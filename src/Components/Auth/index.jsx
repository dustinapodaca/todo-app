import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import { When } from 'react-if';

const Auth = ({capability, children}) => {
  const { isLoggedIn, can } = useContext(AuthContext);
  const okToRender = isLoggedIn && can(capability);

  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
};

export default Auth;
