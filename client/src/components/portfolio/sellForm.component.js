import React from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { sell } from '../../services/stock.service';
import { getPortfolio } from '../../services/user.service';

function SellForm(props) {
    async function handleSellSubmit(values, actions) {
        try {
            const {sellTicker, sellQuantity} = values;
            await sell(sellTicker, sellQuantity);

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
            initialValues={{sellTicker: '', sellQuantity: ''}}
            validationSchema={Yup.object({
                sellTicker: Yup.string().required(required),
                sellQuantity: Yup.number().required(required)
            })}
            onSubmit={(values, actions) => handleSellSubmit(values, actions)}
        >
            {formik => (
                <Form>
                    <div className="form-group">
                        <label className="sr-only">Ticker</label>
                        <Field id="sellTicker" name="sellTicker" type="text" 
                            className="form-control" placeholder="Ticker"/>
                        <ErrorMessage component="div" name="sellTicker" style={{color: "red"}} />
                    </div>
                    <div className="form-group">
                        <label className="sr-only">Quantity</label>
                        <Field id="sellQuantity" name="sellQuantity" type="number" 
                            className="form-control" placeholder="Quantity" min="1"/>
                        <ErrorMessage component="div" name="sellQuantity" style={{color: "red"}} />
                    </div>
                    {formik.status && <div className="alert alert-danger" role="alert">{formik.status}</div>}
                    <div className="form-group">
                        <input type="submit" value="Sell" className="btn btn-primary btn-block" disabled={!Boolean(formik.values.sellTicker) || !Boolean(formik.values.sellQuantity) || !formik.isValid || formik.isSubmitting} />
                    </div>
                </Form>
            )}
        </Formik>
    );
}

SellForm.propTypes = {
    balance: PropTypes.number.isRequired,
    setBalance: PropTypes.func.isRequired,
    setPortfolioList: PropTypes.func.isRequired,
    setTotalPortfolioPrice: PropTypes.func.isRequired
}

export default SellForm;