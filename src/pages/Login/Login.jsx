import { useContext, useEffect, useRef, useState, } from 'react';
import loginImg from '../../assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const captchaRef = useRef(null);
    const [captchaValue, setCaptchaValue] = useState(null);
    const { signIn } = useContext(AuthContext);


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                // Signed in 
                console.log('signin', result.user)
                // ...
            })
            .catch(() => {
                // const errorMessage = error.message;
            });

    }

    const handleValidateCaptcha = () => {
        const value = captchaRef.current.value;
        setCaptchaValue(value);
        if (validateCaptcha(captchaValue) === true) {
            alert('Captcha Matched');
        }
    }

    console.log(captchaValue);
    console.log(validateCaptcha(captchaValue));

    return (
        <div className='login-container'>
            {/* <h3>login pages</h3> */}
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row gap-20">
                    <div className="w-[648px] h-[455px] mx-auto my-auto">
                        <img src={loginImg} className='w-[648px] h-[455px]' alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate ref={captchaRef} />
                                </label>
                                <label className="label">
                                    {/* <LoadCanvasTemplateNoReload /> */}
                                </label>
                                <input ref={captchaRef} type="text" name='captcha'
                                    placeholder="Enter the captcha" className="input input-bordered" required />
                                <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs w-full mt-2">Check Captcha</button>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;