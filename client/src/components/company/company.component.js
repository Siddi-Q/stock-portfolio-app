import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../common/loading-spinner.component';

import { getCompanyInfo } from '../../services/stock.service';

export default function Company() {
    const [companyInfo, setCompanyInfo] = useState();
    const [loading, setLoading] = useState(true);

    const { ticker } = useParams();

    useEffect(() => {
        getCompanyInfo(ticker)
        .then(res => {
            setCompanyInfo(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    }, [ticker]);

    if(loading) {
        return (
            <div className="row justify-content-center">
                <LoadingSpinner/>            
            </div>
        );
    }
    else {
        const { address, address2, CEO, city, companyName, country, description, employees, industry, phone, sector, state, symbol, tags, website, zip } = companyInfo;

        return (
            <>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <h1>{companyName}</h1>
                        <p>{symbol}</p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <p>{website}</p>
                        <p>{phone}</p>
                        <p>{address}</p>
                        <p>{address2}</p>
                        <p>{city}, {state}, {country}</p>
                        <p>{zip}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <p>{CEO}</p>
                        <p>{industry}</p>
                        <p>{sector}</p>
                        {tags.map((tag, idx) => <p key={idx}>{tag}</p>)}
                        <p>{employees}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </>
        );
    }
}