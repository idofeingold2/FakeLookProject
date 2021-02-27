import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useHistory } from "react-router-dom";
import { REGISTER_USER } from '../../actions/user'
import '../../css/LoginCSS/RegisterPage.css';

const Register = (props) => {
  const { register, setError } = props;
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  onRegister = ({username, email, password}) => {
      register(username, email, password)
      .then((res) => {
          if(res.type == REGISTER_USER){
              history.push('/user/login');
          } else {
              setError(res.err);
          }
      });
  };

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
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="input"
                    />
                    <div>The username is your in-app name</div>
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
                <button type="submit" className="loginBtn">
                    Login
                </button>
                <a data-testid="testLink" class="link" onClick={() => navigateTo("/user/login")}>
                    Already have an account? login
                </a>
                </div>
            </Form>
    )}
        </Formik>
    </div>
  )

}

export default Register;