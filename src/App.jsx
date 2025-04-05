
import useAuthStore from './Store/authStore';

import { LandingRoute } from "./Landing"
import { UserRoute } from './User/Router';

export const App = () => {
  const isAuthenticated = useAuthStore((state) => state.Status);

  return (
    <>
      
      {
        isAuthenticated ? (
          <>
            <UserRoute />
          </>
        ) : (
          <LandingRoute />
        )
      }
       
    </>
  )
}







