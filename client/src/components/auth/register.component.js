import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { register } from '../../services/auth.service';

function Register(props) {
    const required = 'Required!';

    return (
        <Formik
            initialValues={{name: '', email: '', password: ''}}
            validationSchema={Yup.object({
                name: Yup.string().required(required),
                email: Yup.string().email('Invalid email address').required(required),
                password: Yup.string().required(required)
            })}
            onSubmit={(values, actions) => {
                const { name, email, password } = values;
                register(name, email, password)
                .then(() => {
                    props.setIsAuth(true);
                })
                .catch(() => {
                    actions.setStatus("Email is in use!");
                    actions.setSubmitting(false);
                });
            }}
        >
            {formik => (
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10 col-12 align-self-end">
                        <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                            <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Register</h3>
                            <Form>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <Field id="name" name="name" type="text"
                                        className="form-control" placeholder="Name"/>
                                    <ErrorMessage component="div" name="name" style={{color: "red"}}/>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <Field id="email" name="email" type="email" 
                                        className="form-control" placeholder="Email"/>
                                    <ErrorMessage component="div" name="email" style={{color: "red"}}/>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <Field id="password" name="password" type="password" 
                                        className="form-control" placeholder="Password"/>
                                    <ErrorMessage component="div" name="password" style={{color: "red"}}/>
                                </div>
                                {formik.status && <div className="alert alert-danger" role="alert">{formik.status}</div>}
                                <div className="form-group">
                                    <input type="submit" value="Submit" className="btn btn-primary btn-block" disabled={!Boolean(formik.values.name) || !Boolean(formik.values.email) || !Boolean(formik.values.password) || !formik.isValid || formik.isSubmitting} />
                                </div>
                            </Form>
                            <Link to="/signin">Have an account? Sign in</Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

Register.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}

export default Register;