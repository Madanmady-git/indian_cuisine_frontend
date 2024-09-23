import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/DishDetails.scss';
const DishDetails = () => {

  const [dish, setDish] = useState({});
  let { id } = useParams();
    
  const getDishDetails = async() => {
    console.log('name', id);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/dishes/dish/${id}`);
      setDish(response.data);
  } catch (error) {
      console.error('Error fetching dishes', error);
  }
  }

  useEffect(() => {
      getDishDetails();
  }, [id]);

  return (
    <div className='details-conatiner'>
      <h1>{dish.name}</h1>
      <div className='card-conatiner'>
        <div className='detailcard'>
          <h4>Ingredients:</h4>
          <p>{dish.ingredients}</p>
        </div>
        <div className='detailcard'>
          <h4>Diet:</h4>
          <p>{dish.diet}</p>
        </div>
        <div className='detailcard'>
          <h4>Preparation Time:</h4>
          <p>{dish.prep_time} minutes</p>
        </div>
        <div className='detailcard'>
            <h4>Cooking Time: </h4>
            <p>{dish.cook_time} minutes</p>
        </div>
        <div className='detailcard'>
            <h4>Flavour:</h4>
            <p>{dish.flavor_profile}</p>
        </div>
        <div className='detailcard'>
            <h4>Course: </h4>
            <p>{dish.course}</p>
        </div>
        <div className='detailcard'>
            <h4>State: </h4>
            <p>{dish.state}</p>
        </div>
        <div className='detailcard'>
            <h4>Region: </h4>
            <p>{dish.region}</p>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
