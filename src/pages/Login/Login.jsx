import { useEffect, useRef, useState, } from 'react';
import loginImg from '../../assets/others/authentication1.png'
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import './Login.css'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';



    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then((result) => {
                console.log('signin', result.user)
                // Signed in popup swal
                navigate(from, { replace: true });
            })
            .catch(() => {
                // const errorMessage = error.message;
            });

    }

    const handleValidateCaptcha = (e) => {
        e.preventDefault();
        const userCaptchaValue = captchaRef.current.value;
        if (validateCaptcha(userCaptchaValue) === true) {
            setDisabled(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Bostro Boss Login</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <div className='login-container'>
                <div className="hero min-h-screen ">
                    <div className="hero-content  flex-col lg:flex-row gap-20">
                        <div className="w-[648px] h-[455px] mx-auto my-auto">
                            <img src={loginImg} className='w-[648px] h-[455px]' alt="" />
                        </div>
                        <div className="card shrink-0 w-full max-w-lg shadow-2xl ">
                            <h3 className='text-3xl font-bold text-center mt-4'>Log In</h3>
                            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', { required: 'Email is required' })}
                                        placeholder="email"
                                        className="input input-bordered"
                                    />
                                    {errors.email && <span>{errors.email.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register('password', { required: 'Password is required' })}
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="lebel m-2">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <div className="join w-full border">
                                        <input
                                            ref={captchaRef}
                                            className="input input-bordered w-full join-item"
                                            // {...register('captcha', { required: 'Captcha is required' })}
                                            type="text"
                                            placeholder="Enter the captcha"
                                        />
                                        <button onClick={handleValidateCaptcha} className="btn btn-outline join-item rounded-r-lg">Submit</button>
                                    </div>
                                    {errors.captcha && <span>{errors.captcha.message}</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <button type="submit" disabled={disabled} className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className='text-center space-y-4 mb-4'>
                                <p>New here?? <span className="link link-hover link-primary font-bold text-lg"><Link to='/signup'>Create a New Account</Link></span></p>
                                <p>or login with</p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;