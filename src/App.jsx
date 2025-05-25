
import useAuthStore from './Store/authStore';

import { LandingRoute } from "./Landing"
import { UserRoute } from './User/Router';
import { CashierRoute } from './Cashier';
import { DashboardRouter } from './Dashboard/Router';

export const App = () => {
  const isAuthenticated = useAuthStore((state) => state.Status);
  const roles = useAuthStore((state) => state.roles);


  const renderRouteByRole = () => {
    if ( roles.includes("usuario") || roles.includes("VipUsuario") ) {
      return <UserRoute />;
    } else if (roles.includes("Administrador")) {
      return <DashboardRouter />;
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







