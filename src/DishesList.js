import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/DishesList.scss'; // Assuming you have a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const DishesList = () => {
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Fetching dishes from the backend
    const getDishes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/dishes`);
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes', error);
        }
    }

    useEffect(() => {
        getDishes();
    }, []);

    // Calculate the displayed dishes
    const displayedDishes = dishes.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle pagination
    const totalPages = Math.ceil(dishes.length / rowsPerPage);
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="dishes-container">
            <h2>Indian Cuisine</h2>
            <table className="dishes-table">
                <thead>
                    <tr>
                        <th>Dish Name</th>
                        <th>Prep Time (mins)</th>
                        <th>Cook Time (mins)</th>
                        <th>diet</th>
                        <th>flavor_profile</th>
                        <th>course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedDishes.map((dish) => (
                        <tr key={dish.name}>
                            <td>{dish.name}</td>
                            <td>{dish.prep_time}</td>
                            <td>{dish.cook_time}</td>
                            <td>{dish.diet}</td>
                            <td>{dish.flavor_profile}</td>
                            <td>{dish.course}</td>
                            <td>
                                <button
                                onClick={() => {navigate(`/dish/${dish.name}`)
                                }}
                                className="page-btn"
                                style={{padding:'6px 12px'}}
                                >View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }).slice(
                    Math.max(0, currentPage - 3), 
                    Math.min(currentPage + 2, totalPages)
                ).map((_, idx) => {
                    const page = Math.max(0, currentPage - 3) + idx;
                    return (
                        <button
                            key={page + 1}
                            className={`page-btn ${currentPage === page + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    );
                })}

                <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DishesList;
