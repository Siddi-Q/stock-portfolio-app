import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { buy } from '../../../services/stock';
import { getPortfolio } from '../../../services/user';

export default function BuyForm(props) {
  async function handleBuySubmit(values, actions) {
    try {
      const {buyTicker, buyQuantity} = values;
      await buy(buyTicker, buyQuantity);

      toast.success(`Success! You bought ${buyQuantity} ${buyQuantity > 1 ? 'stocks': 'stock'} of ${buyTicker.toUpperCase()}.`);
      const res = await getPortfolio();
      const {portfolioList, balance, totalPortfolioPrice} = res.data;

      props.setPortfolioList(portfolioList);
      props.setBalance(balance);
      props.setTotalPortfolioPrice(totalPortfolioPrice);
      actions.resetForm();
    } catch {
      actions.setStatus('An error occurred. Try again!');
    }
  }

  const required = 'Required!';

  return (
    <Formik
      initialValues={
        {
          buyTicker: '',
          buyQuantity: '',
        }
      }
      validationSchema={
        Yup.object({
          buyTicker: Yup.string().required(required),
          buyQuantity: Yup.number().required(required),
        })
      }
      onSubmit={(values, actions) => handleBuySubmit(values, actions)}
    >
      {formik => (
        <Form>
          <div className="form-group">
            <label className="sr-only" htmlFor="buyTicker">Ticker</label>
            <Field id="buyTicker" name="buyTicker" type="text" className="form-control" placeholder="Ticker" />
            <ErrorMessage component="div" name="buyTicker" style={{color: "red"}} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="buyQuantity">Quantity</label>
            <Field id="buyQuantity" name="buyQuantity" type="number" className="form-control" placeholder="Quantity" min="1" />
            <ErrorMessage component="div" name="buyQuantity" style={{color: "red"}} />
          </div>
          {formik.status && <div className="alert alert-danger" role="alert">{formik.status}</div>}
          <div className="form-group">
            <button type="submit" value="Buy" className="btn btn-primary btn-block" disabled={!Boolean(formik.values.buyTicker) || !Boolean(formik.values.buyQuantity) || !formik.isValid || formik.isSubmitting}>
              {(!formik.isValidating && formik.isSubmitting) &&
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  <span className="sr-only">Loading...</span>
                </>
              }
              Buy
            </button>
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
  setTotalPortfolioPrice: PropTypes.func.isRequired,
}
