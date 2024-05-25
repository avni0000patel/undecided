import React from 'react';

import FabricCanvas from '../FabricCanvas/fabricCanvas';

export default function CreateYourVision({ collapsed }) {
    const styles = {
        createYourVision: {
            alignItems: 'center',
            color: "#FFFFFF",
            display: collapsed ? 'flex' : 'none',
            flexDirection: 'column',
            float: 'right',
            fontFamily: "Indie Flower",
            fontStyle: "normal",
            fontWeight: 400,
            justifyContent: 'center',
            padding: '2rem 2rem',
            textAlign: 'center',
            width: collapsed ? 'calc(100% - 78px)' : 'auto',
        },
        heading: {
            fontSize: '2rem',
            marginBottom: '1rem',
        },
    }
    return (
        <div className="createYourVision" style={styles.createYourVision}>
            <h1 style={styles.heading}>Create Your Vision!</h1>
            <FabricCanvas />
        </div>
    )
}