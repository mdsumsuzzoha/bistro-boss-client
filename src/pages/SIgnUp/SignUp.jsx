import { useForm } from 'react-hook-form';
import loginImg from '../../assets/others/authentication1.png'
import './SignUp.css'
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth()
    // const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from.pathname || '/';

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        // console.log(data)
        const { email, password, name, photoUrl } = data;
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        // set users info in DB 
                        const userInfo = {
                            name: name,
                            email: email,
                            // creationTime:result.user.creationTime,                    
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Successeded",
                                        text: "User created successfully",
                                        icon: "success"
                                    });
                                    navigate(from, { replace: true });
                                    reset();
                                }
                            })
                        // Profile updated!
                    }).catch((error) => {
                        console.log(error)
                        // ...
                    });
            })
            .catch(() => {
            })
    };
    // console.log(errors.password)

    return (
        <>
            <Helmet>
                <title>Bostro Boss Sign Up</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <div className='signUp-container'>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="w-[648px] h-[455px] mx-auto my-auto">
                            <img src={loginImg} className='w-[648px] h-[455px]' alt="" />
                        </div>
                        <div className="card shrink-0 w-full max-w-lg shadow-2xl ">
                            <h3 className='text-3xl font-bold text-center mt-4'>Sign Up</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                    {errors.name && <span className='text-red-400'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo" className="input input-bordered" />
                                    {errors.name && <span className='text-red-400'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className='text-red-400'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"
                                        {...register("password",
                                            {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters long",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|[\]{};:/<>,.])(?=.*[0-9]).{6,}$/,
                                                    message: "Password should contain at least one uppercase letter, one lowercase letter, and one special character",
                                                }
                                            }
                                        )}
                                        aria-invalid={errors.password ? "true" : "false"}
                                        placeholder="password" className="input input-bordered" />
                                    {errors.password && <p role="alert">{errors.password.message}</p>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className="btn btn-primary" value='Sign Up' />
                                </div>
                            </form>
                            <div className='text-center space-y-4 mb-4'>
                                <p>Already register?? <span><Link to='/login'>Go to login</Link></span></p>
                                <p>Sign up with</p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default SignUp;