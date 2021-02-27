import React from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { buy, getPortfolio } from '../../services/user.service';

function BuyForm(props) {
    async function handleBuySubmit(values) {
        try {
            const {buyTicker, buyQuantity} = values;
            await buy(buyTicker, buyQuantity);

            const res = await getPortfolio();
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            
            props.setPortfolioList(portfolioList);
            props.setBalance(balance);
            props.setTotalPortfolioPrice(totalPortfolioPrice);
        }
        catch {
            props.setErrorMessage("An error occurred. Try again!");
        }
    }

    return (
        <Formik
            initialValues={{buyTicker: '', buyQuantity: ''}}
            validationSchema={Yup.object({
                buyTicker: Yup.string().required('Required'),
                buyQuantity: Yup.number().required('Required')
            })}
            onSubmit={(values) => handleBuySubmit(values)}
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
                    <div className="form-group">
                        <input type="submit" value="Buy" className="btn btn-primary btn-block" />
                    </div>
                </Form>
            )}
        </Formik>
    );
}

BuyForm.propTypes = {
    balance: PropTypes.number.isRequired,
    errorMessage: PropTypes.string.isRequired,
    setBalance: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    setPortfolioList: PropTypes.func.isRequired,
    setTotalPortfolioPrice: PropTypes.func.isRequired
}

export default BuyForm;