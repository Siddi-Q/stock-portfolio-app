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
        return (
            <>
                <h1>Company - {ticker}</h1>
                <p>{JSON.stringify(companyInfo, null, 2)}</p>
            </>
        );
    }
}