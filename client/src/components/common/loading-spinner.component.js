import React from 'react';

export default function LoadingSpinner() {
    return  (
        <div className="row justify-content-center">
            <div className="spinner-border" style={{width: "10rem", height: "10rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}