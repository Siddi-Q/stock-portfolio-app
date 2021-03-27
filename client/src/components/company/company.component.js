import React from 'react';
import { useParams } from 'react-router';

export default function Company() {
    const { ticker } = useParams();
    
    return (
        <h1>Company - {ticker}</h1>
    );
}