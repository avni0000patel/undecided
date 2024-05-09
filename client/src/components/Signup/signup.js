import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import '../../assets/fonts/fonts.css';

const Signup = ({ collapsed }) => {
    const styles = {
        signup: {
            padding: '2rem 2rem',
            float: 'right',
            width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
        },
        signupButton: {
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
        signupWelcome: {
            color: "#FFFFFF",
            fontFamily: "Over the Rainbow",
            fontWeight: 400,
            fontStyle: "normal",
        },
        signupIntro: {
            color: "#FFFFFF",
            fontFamily: "Indie Flower",
            fontStyle: "normal",
            fontWeight: 400,
        }
    }

    const [formState, setFormState] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        username: '',
    });

    const [addUser, { error, data }] = useMutation(ADD_USER);

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
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="signup" style={styles.signup}>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <h1 className="signup-welcome mb-0" style={styles.signupWelcome}>Welcome!</h1>
                    <h5 className="signup-intro mb-0" style={styles.signupIntro}>Please signup to continue</h5>
                    <Form.Control
                        className="form-input"
                        placeholder="Your first name"
                        name="first_name"
                        type="text"
                        value={formState.first_name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <Form.Control
                        className="form-input"
                        placeholder="Your last name"
                        name="last_name"
                        type="text"
                        value={formState.last_name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <Form.Control
                        className="form-input"
                        placeholder="Your username"
                        name="username"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        required
                    />
                    <br />
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
                        style={styles.signupButton}
                        type="submit"
                    >
                        Signup
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

export default Signup;
