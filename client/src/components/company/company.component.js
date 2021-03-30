import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../common/loading-spinner.component';

import { getCompanyInfo } from '../../services/stock.service';

import { geoAlt, link45Deg, telephone } from '../../icons/icons';

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
        const { CEO, city, companyName, country, description, employees, industry, phone, sector, state, tags, website } = companyInfo;

        return (
            <>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <h1>{companyName}</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        {link45Deg}{' '}
                        <a href={website}>{website}</a>
                        <br />
                        {telephone}{' '}
                        <span>{phone}</span>
                        <br />
                        {geoAlt}{' '}
                        <span>{city}, {state}, {country}</span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {CEO && <span><strong>CEO</strong> {CEO}</span>}
                        <br />
                        {<span><strong>Industry</strong> {industry}</span>}
                        <br />
                        {industry && <span><strong>Sector</strong> {sector}</span>}
                        <br />
                        <span><strong>Tags </strong></span>
                        {tags && tags.map((tag, idx) => <span key={idx} className="badge badge-info mr-1">{tag}</span>)}
                        <br />
                        {employees && <span><strong># of employees</strong> {employees}</span>}
                        <br />
                        <br />
                        <span><strong>Description</strong></span>
                        {description != "0" && <p>{description}</p>}
                    </div>
                </div>
            </>
        );
    }
}