
import useAuthStore from './Store/authStore';

import { LandingRoute } from "./Landing"
import { UserRoute } from './User/Router';
import { CashierRoute } from './Cashier';

export const App = () => {
  const isAuthenticated = useAuthStore((state) => state.Status);
  const roles = useAuthStore((state) => state.roles);


  const renderRouteByRole = () => {
    if ( roles.includes("usuario") || roles.includes("VipUsuario") ) {
      return <UserRoute />;
    } else if (roles.includes("Admin")) {
      return <h1>Admin</h1>;
    } else if (roles.includes("Cajero")) {
      return <CashierRoute />;
    } else {
      return <h1>Acceso denegado</h1>;
    }
  };

  return (
    <>

      {
        isAuthenticated ? (
          renderRouteByRole()
        ) : (
          <LandingRoute />
        )
      }

    </>
  )
}







