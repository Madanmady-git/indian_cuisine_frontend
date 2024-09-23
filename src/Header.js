import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/Header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [searchDishes, setSearchDishes] = useState([]);
    const [buttonName, setButtonName] = useState('Suggest Dish');
    const searchRef = useRef(null);

    const getDishes = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND + `/dishes/search?search=${query}`);
            setSearchDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    }

    const handleDishClick = (dishName) => {
        navigate(`/dish/${dishName}`);
        setQuery(''); // Clear query to close suggestions
        setSearchDishes([]); // Close dropdown
    };

    useEffect(() => {
        if (query) {
            getDishes();
        } else {
            setSearchDishes([]); // Clear suggestions when input is cleared
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchDishes([]); // Close dropdown if clicked outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        if (buttonName == 'Suggest Dish') {
            setButtonName('Dishes');
            navigate('/suggester');
        } else {
            setButtonName('Suggest Dish');
            navigate('/')
        }
    }

    return (
        <header className='header'>
            <div className='search' ref={searchRef}>
                <div style={{ width:'100%', position: 'relative'}}>
                    <input
                        className='searchField'
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for dishes, ingredients, or origin"
                        autoComplete="off"
                    />

                    {/* Search Suggestions Modal */}
                    {searchDishes.length > 0 && (
                        <div 
                        className="search-results">
                            <ul>
                                {searchDishes.map((dish, index) => (
                                    <li 
                                    key={index} onClick={() => {handleDishClick(dish.name)}}
                                    >
                                        <strong>{dish.name}</strong>
                                        <span> &nbsp;   •  &nbsp;  {dish.ingredients}</span>
                                        <span>  &nbsp;  •   &nbsp; {dish.state}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div >
                    <button className='feature-button'
                    onClick={() => {
                        handleButtonClick()
                    }}
                    >
                        {
                            buttonName
                        }
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
