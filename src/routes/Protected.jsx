


export default function Protected({children}) {
  
     if (!isAuthenticated) {
      //  return <Navigate to="/login" state={{ from: location }} replace />;
      return
     }
     return children;

}
