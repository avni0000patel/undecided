import { Link } from 'react-router-dom';

export default function Home() {
  const styles = {
    container: {
      background: 'linear-gradient(90deg, #C1E1C5 0%, #A4D9B1 100%)',
      borderRadius: '2.5rem',
      boxShadow: '15px 15px 15px rgba(46, 54, 68, 0.4)',
      display: 'flex',
      alignItems: 'center',
      padding: '5rem 3rem',
      marginTop: '20px',
      marginBottom: '20px',
      float: 'right',
      width: 'calc(100% - 240px)',
      marginRight: '10px',
    }
  }
  return (
    <div>
      <div className="container flex-row justify-center" style={styles.container}>
      </div>
    </div>
  )
}