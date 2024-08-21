import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "../../../store/Auth";

function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to track loading
    const { storeTokenInLocalStorage } = useAuth();

    const onSubmit = (data) => {
        setLoading(true); // Set loading to true when the request starts
        axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/users/loginUser`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            console.log('User logged in successfully:', res);
            alert('Login successful!');
            storeTokenInLocalStorage(res.data.token)
            reset();
            navigate('/account'); // Navigate to the home page
        })
        .catch((err) => {
            console.error(err);
            alert('Login failed!');
        })
        .finally(() => {
            setLoading(false); // Set loading to false after the request completes
        });
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                    <h3 className="text-center my-3">Login Here</h3>
                    <p className="text-center">Please enter your login details</p>

                    <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email", { required: "Email is required" })}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button 
                            type="submit" 
                            variant="outlined" 
                            className="mt-3"
                            disabled={loading} // Disable button while loading
                            startIcon={loading ? <CircularProgress size={20} /> : null} // Add loading spinner
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>

                    <div className="mt-5 mb-5">
                        <Link to='/account/register'>
                            <Button variant="contained" className="w-100 py-3">
                                Don't have an account? 
                                <span className="ms-2"><u>Create account</u></span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
