import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useHistory } from "react-router-dom";

import '../../css/LoginCSS/ForgotPasswordPage.css'

// NEED TO DO *WIP*

const ForgotPassword = (props) => {
    const {update, setError} = props;
    const history = useHistory();

    const navigateTo = (path) => {
        history.push(path);
    };

    const onRegister = ({username, email, password}) => {
        update()
    }

    return (
        <div>
            Test 1.1.2.2.3.3
        </div>
    )
}

export default ForgotPassword;