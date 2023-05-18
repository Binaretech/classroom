import React from 'react';
import swagger from '@site/static/swagger.json';
import SwaggerUI from 'swagger-ui-react';
import styles from "swagger-ui-react/swagger-ui.css"

export default function App() {
    console.log(styles)
    return (
        <SwaggerUI spec={swagger} />
    )
}

