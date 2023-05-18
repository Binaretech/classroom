import React from 'react';
import SwaggerUI from 'swagger-ui-react';

export default function App({ spec }: { spec: any }) {
    return (
        <SwaggerUI spec={spec} />
    )
}

