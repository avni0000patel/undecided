import React from 'react';

export default function Home({ collapsed }) {
  const styles = {
    home: {
      float: 'right',
      padding: '2rem 2rem',
      width: collapsed ? 'calc(100% - 78px)' : 'calc(100% - 268px)',
    },
    inside: {
      alignItems: 'center',
      color: "#FFFFFF",
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "Indie Flower",
      fontStyle: "normal",
      fontWeight: 400,
      justifyContent: 'center',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      maxWidth: '600px',
    },
    infoContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    infoBox: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginBottom: '1rem',
      padding: '1rem',
      width: '300px',
    },
    infoTitle: {
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
    },
    infoText: {
      fontSize: '1rem',
    },
  }
  return (
    <div className="home" style={styles.home}>
      <div style={styles.inside}>
        <h1 style={styles.heading}>Welcome to Nest Craft!</h1>
        <p style={styles.description}>Bring your vision to life.</p>
        <div style={styles.infoContainer}>
          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>Explore Designs</h2>
            <p style={styles.infoText}>Browse through a vast collection of Indian clothing designs, from traditional to modern.</p>
          </div>
          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>Create Your Vision</h2>
            <p style={styles.infoText}>Use our design tools to customize your clothing, ensuring it reflects your unique style.</p>
          </div>
        </div>
      </div>
    </div>
  )
}