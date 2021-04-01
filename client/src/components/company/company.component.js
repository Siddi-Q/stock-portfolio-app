import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../common/loading-spinner.component';

import { getCompanyInfo } from '../../services/stock.service';

import { geoAlt, link45Deg, telephone } from '../../icons/icons';

export default function Company() {
    const [companyInfo, setCompanyInfo] = useState({});
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
                <div className="row justify-content-center">
                    <img src={`https://storage.googleapis.com/iex/api/logos/${ticker}.png`} alt="Logo" className="float-left"/>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <h1>{companyName}</h1>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        {website !== "0" &&
                        <>
                            {link45Deg}{' '}
                            <a href={website}>{website}</a>
                            <br />
                        </>
                        }
                        {phone !== "0" &&
                        <>
                            {telephone}{' '}
                            <span>{phone}</span>
                            <br />
                        </>
                        }
                        {city !== "0" && state !== "0" && country !== "0" &&
                        <>
                            {geoAlt}{' '}
                            <span>{city}, {state}, {country}</span>
                            <br />
                        </>
                        }
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {CEO !== "0" &&
                        <>
                            <span><strong>CEO</strong> {CEO}</span>
                            <br />
                        </>
                        }
                        {industry !== "0" &&
                        <>
                            <span><strong>Industry</strong> {industry}</span>
                            <br />
                        </>
                        }
                        {sector !== "0" &&
                        <>
                            <span><strong>Sector</strong> {sector}</span>
                            <br />
                        </>
                        }
                        {tags && 
                        <>
                            <span><strong>Tags </strong></span>
                            {tags.map((tag, idx) => <span key={idx} className="badge badge-info text-wrap mr-1">{tag}</span>)}
                            <br />
                        </>
                        }
                        {employees &&
                        <>
                            <span><strong># of employees</strong> {employees}</span>
                            <br />
                        </>
                        }
                        
                        <br />
                        {description !== "0" && 
                        <>
                            <span><strong>Description</strong></span>
                            <p>{description}</p>
                        </>
                        }
                    </div>
                </div>
            </>
        );
    }
}