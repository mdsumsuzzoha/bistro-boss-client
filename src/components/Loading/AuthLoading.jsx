import { PuffLoader } from "react-spinners";

const AuthLoading = () => {
    return (
        <div className="min-h-screen w-full mx-auto text-center">
            <PuffLoader color="#36d7b7" />            
        </div>
    );
};

export default AuthLoading;