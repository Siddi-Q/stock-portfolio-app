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
                        <a href={website}>{website}</a>
                        <br />
                        <span>{phone}</span>
                        <br />
                        <span>{address}</span>
                        <br />
                        <span>{address2}</span>
                        <br />
                        <span>{city}, {state}, {country}</span>
                        <br />
                        <span>{zip}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <span><strong>CEO</strong> {CEO}</span>
                        <br />
                        <span><strong>Industry</strong> {industry}</span>
                        <br />
                        <span><strong>Sector</strong> {sector}</span>
                        <br />
                        <span><strong>Tags </strong></span>
                        {tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
                        <br />
                        <span><strong># of employees</strong> {employees}</span>
                        <br />
                        <br />
                        <span><strong>Description</strong></span>
                        <p>{description}</p>
                    </div>
                </div>
            </>
        );
    }
}