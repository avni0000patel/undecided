import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ collapsed }) {
    const styles = {
        design: {
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
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '1rem',
        },
        description: {
            fontSize: '24px',
            marginBottom: '2rem',
            maxWidth: '600px',
        },
        infoContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        infoBox: {
            border: '1px solid #FFFFFFF',
            borderRadius: '8px',
            padding: '20px 20px 20px 20px',
            width: '300px',
        },
        infoLink: {
            textDecoration: 'none',
        },
        infoTitle: {
            color: '#FFFFFF',
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '0.5rem',
            textDecoration: 'none',
        },
        infoText: {
            color: '#FFFFFF',
            fontFamily: 'Space Mono',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            textDecoration: 'none',
        },
    }
    return (
        <div className="design" style={styles.design}>
            {/* <div style={styles.inside}> */}
            <h1 style={styles.heading}>Welcome to Nest Craft!</h1>
            <p style={styles.description}>Bring your vision to life.</p>
            <div style={styles.infoContainer}>
                <div style={styles.infoBox}>
                    <h2 style={styles.infoTitle}>Explore Designs</h2>
                    <p style={styles.infoText}>Browse through a vast collection of Indian clothing designs, from traditional to modern.</p>
                </div>
                <div style={styles.infoBox}>
                    <Link to="/createyourvision" style={styles.infoLink}>
                        <h2 style={styles.infoTitle}>Create Your Vision</h2>
                        <p style={styles.infoText}>Use our design tools to customize your clothing, ensuring it reflects your unique style.</p>
                    </Link>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}