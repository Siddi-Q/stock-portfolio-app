import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getCompanyInfo } from '../../services/stock.service';

export default function Company() {
    const [companyInfo, setCompanyInfo] = useState();
    const { ticker } = useParams();

    useEffect(() => {
        getCompanyInfo(ticker)
        .then(res => {
            setCompanyInfo(res.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);
    
    return (
        <>
            <h1>Company - {ticker}</h1>
            <p>{JSON.stringify(companyInfo, null, 2)}</p>
        </>
    );
}