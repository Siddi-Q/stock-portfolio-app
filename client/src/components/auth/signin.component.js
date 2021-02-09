import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { signin } from '../../services/auth.service';

function Signin(props) {
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().required('Required')
            })}
            onSubmit={(values, actions) => {
                const { email, password } = values;
                signin(email, password)
                .then(() => {
                    props.setIsAuth(true);
                })
                .catch((error) => {
                    actions.setStatus(error.response.data.message);
                    actions.setSubmitting(false);
                });
            }}
        >
            {formik => (
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10 col-12 align-self-end">
                        <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                            <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Sign in</h3>
                            <Form>
                                <div className="form-group">
                                    <label className="sr-only" for="email">Email</label>
                                    <Field id="email" name="email" type="email" 
                                        className="form-control" placeholder="Email"/>
                                    <ErrorMessage component="div" name="email" style={{color: "red"}} />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="password">Password</label>
                                    <Field id="password" name="password" type="password" 
                                        className="form-control" placeholder="Password"/>
                                    <ErrorMessage component="div" name="password" style={{color: "red"}}/>
                                </div>
                                {formik.status && <div className="alert alert-danger" role="alert">{formik.status}</div> }
                                <div className="form-group">
                                    <input type="submit" value="Sign in" className="btn btn-primary btn-block" disabled={!Boolean(formik.values.email) || !Boolean(formik.values.password) || !formik.isValid || (formik.isSubmitting)} />
                                </div>
                            </Form>
                            <Link to="/register">Don't have an account? Sign Up</Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

Signin.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}

export default Signin;