import { Topic } from '@mui/icons-material';
import React from 'react';

const NotFound = () => {
    return (
        <div>
            <h5 style={
                { 
                    color: 'black', 
                    fontSize: '24px',
                    textAlign: 'center',
                    margin: 0,
                    marginTop: '3vw'
                }}
                >
                    This page isn't available. 
                </h5>

                <p style={{
                    color: 'black',
                    fontSize: '18px', 
                    textAlign: 'center' 
                }}>
                    The link you followed may be broken, or the page may have been removed.
                </p>       
        </div>
    );
}

export default NotFound;





