import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import '../../assets/fonts/fonts.css';

const Login = ({ collapsed }) => {
    const styles = {
        login: {
            padding: '2rem 2rem',
            float: 'right',
            width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
        },
        loginButton: {
            background: 'linear-gradient(90deg, #C1E1C5 0%, #A4D9B1 100%) ',
            border: "none",
            borderRadius: "5px",
            color: "#FFFFFF",
            display: "inline-block",
            fontFamily: "Indie Flower",
            fontStyle: "normal",
            fontWeight: 400,
            marginLeft: "0px",
            marginTop: "10px",
            padding: "5px 10px",
        },
        loginWelcome: {
            color: "#FFFFFF",
            fontFamily: "Over the Rainbow",
            fontWeight: 400,
            fontStyle: "normal",
        },
        loginIntro: {
            color: "#FFFFFF",
            fontFamily: "Indie Flower",
            fontStyle: "normal",
            fontWeight: 400,
        }
    }

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div className="login" style={styles.login}>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <h1 className="login-welcome mb-0" style={styles.loginWelcome}>Welcome back!</h1>
                    <h5 className="login-intro mb-0" style={styles.loginIntro}>Please login to continue</h5>
                    <Form.Control
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <Form.Control
                        className="form-input"
                        placeholder="Your password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <button
                        className="btn btn-block"
                        style={styles.loginButton}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            )}

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Login;
