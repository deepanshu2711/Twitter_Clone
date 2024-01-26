const AuthLayout = ({children}) => {
    return ( 
        <div className="flex justify-center items-center h-screen w-screen">
        <div>
            {children}
        </div>
        </div>
     );
}
 
export default AuthLayout;