import React from 'react';
import SwaggerUI from 'swagger-ui-react';

export default function App({ spec }: { spec: any }) {
    return (
        <SwaggerUI spec={spec} withCredentials persistAuthorization onComplete={(swaggerUI) => {
            swaggerUI.preauthorizeBasic('basicAuth', { username: 'admin', password: 'admin' })
        }} />
    )
}

