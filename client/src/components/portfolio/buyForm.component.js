import React from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { buy, getPortfolio } from '../../services/user.service';

function BuyForm(props) {
    async function handleBuySubmit(values, actions) {
        try {
            const {buyTicker, buyQuantity} = values;
            await buy(buyTicker, buyQuantity);

            const res = await getPortfolio();
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            
            props.setPortfolioList(portfolioList);
            props.setBalance(balance);
            props.setTotalPortfolioPrice(totalPortfolioPrice);
            actions.resetForm();
        }
        catch {
            actions.setStatus("An error occurred. Try again!");
        }
    }

    const required = 'Required!';

    return (
        <Formik
            initialValues={{buyTicker: '', buyQuantity: ''}}
            validationSchema={Yup.object({
                buyTicker: Yup.string().required(required),
                buyQuantity: Yup.number().required(required)
            })}
            onSubmit={(values, actions) => handleBuySubmit(values, actions)}
        >
            {formik => (
                <Form>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="buyTicker">Ticker</label>
                        <Field id="buyTicker" name="buyTicker" type="text" 
                            className="form-control" placeholder="Ticker"/>
                        <ErrorMessage component="div" name="buyTicker" style={{color: "red"}} />
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="buyQuantity">Quantity</label>
                        <Field id="buyQuantity" name="buyQuantity" type="number" 
                            className="form-control" placeholder="Quantity" min="1"/>
                        <ErrorMessage component="div" name="buyQuantity" style={{color: "red"}} />
                    </div>
                    {formik.status && <div className="alert alert-danger" role="alert">{formik.status}</div>}
                    <div className="form-group">
                        <input type="submit" value="Buy" className="btn btn-primary btn-block" disabled={!Boolean(formik.values.buyTicker) || !Boolean(formik.values.buyQuantity) || !formik.isValid || formik.isSubmitting} />
                    </div>
                </Form>
            )}
        </Formik>
    );
}

BuyForm.propTypes = {
    balance: PropTypes.number.isRequired,
    setBalance: PropTypes.func.isRequired,
    setPortfolioList: PropTypes.func.isRequired,
    setTotalPortfolioPrice: PropTypes.func.isRequired
}

export default BuyForm;