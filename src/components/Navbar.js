import { Link } from 'react-router-dom';
import './Navbar.css';
// import React from 'react';
import Searchbar from './Searchbar';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
// import { useFetch } from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';


export default function Navbar() {
  const { color} = useTheme()
  return (
    <div className="navbar" style={{background: color}}>
      <nav >
        <Link to="/" className='brand'>
          <h1>Cooking ninja</h1>
        </Link>
        <Searchbar/>
        <Link to="/create">
          <h1>Create Recipe</h1>
        </Link>
      </nav>
    </div>
  );
}
