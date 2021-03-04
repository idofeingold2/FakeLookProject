import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useHistory } from "react-router-dom";
import '../../css/LoginCSS/LoginPage.css'

const Login = (props) => {
    const {setUser, setError, history} = props;
    
    const navigateTo = (path) => {
        history.push(path);
    }

    const onLogin =({email, password}) => {
        console.log(email, password);
    }
    
    return (
        <div className="container">
            <div className="polygon">
            </div>
            <div className="words">FakeLook</div>
                <Formik
                initialValues={{email: "", password: ""}}
                onSubmit={onLogin}>
                    {({errors, touched}) => (
                        <Form>
                        <div className="form">
                            <Field
                            id="email"
                            name="email"
                            placeholder="E-Mail"
                            className="input"
                            />
                            <Field
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            />
                        <a onClick={() => navigateTo("/user/forgot")} className="forgotPasswordTxt">
                            Forgot your password?
                        </a>
                        <button type="submit" className="loginBtn">
                            Login
                        </button>
                         <a onClick={() => navigateTo("/user/register")} className="signUpTxt">
                            Don't have an account? Sign up!
                         </a>
                        </div>
                    </Form>
            )}
            </Formik>
        </div>
    )
}

export default Login;