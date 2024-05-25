import React from 'react';

export default function Home({ collapsed }) {
  const styles = {
    home: {
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
    description: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      maxWidth: '600px',
    },
  }
  return (
    <div className="home" style={styles.home}>
      <h1 style={styles.heading}>Welcome to Nest Craft!</h1>
      <p style={styles.description}>Bring your vision to life.</p>
    </div>
  )
}