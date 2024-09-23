import React, { useEffect, useState } from 'react';
import ChipInput from './components/ChipInput';
import './styles/DishSuggestor.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DishSuggester = () => {
  const navigate = useNavigate();
  const [chips, setChips] = useState([]);
  const [dishes, setDishes] = useState([]);

  const getDishDetails = async() => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/dishes/suggest`, {
        ingredients : chips
      });
      setDishes(response.data);
  } catch (error) {
      console.error('Error fetching dishes', error);
  }
  }

  useEffect(() => {
      if (chips.length > 0) getDishDetails();
  }, [chips]);

  return (
    <div className='suggestor-container'>
        <ChipInput chips={chips} setChips={setChips}/>
        {
          dishes.length !== 0 
          && 
          <h3>Possible Dishes ({dishes.length})</h3>
        }
      <div className='suggest'>
        {
          dishes.map((dish) => {
            return (

            <div 
            onClick={() => {
              navigate(`/dish/${dish.name}`)
            }}
            className='suggest-card-container'>
              <h1>{dish.name}</h1>
              <div className='dish-details'>
                <div className='suggest-detailcard'>
                  <h4>Diet:</h4>
                  <p>{dish.diet}</p>
                </div>
                <div className='suggest-detailcard'>
                  <h4>Preparation Time:</h4>
                  <p>{dish.prep_time} minutes</p>
                </div>
                <div className='suggest-detailcard'>
                    <h4>Cooking Time: </h4>
                    <p>{dish.cook_time} minutes</p>
                </div>
                <div className='suggest-detailcard'>
                    <h4>Flavour:</h4>
                    <p>{dish.flavor_profile}</p>
                </div>
                <div className='suggest-detailcard'>
                    <h4>Course: </h4>
                    <p>{dish.course}</p>
                </div>
                <div className='suggest-detailcard'>
                    <h4>State: </h4>
                    <p>{dish.state}</p>
                </div>
                <div className='suggest-detailcard'>
                    <h4>Region: </h4>
                    <p>{dish.region}</p>
                </div>
              </div>
            </div>
            )
          })
        }
      </div>  
    </div>
  )
};

export default DishSuggester;
