import React, { use } from 'react';

const NewestCars = ({carsPromise}) => {

    const cars = use(carsPromise);
    console.log(cars)
    return (
        <div>
        
        </div>
    );
};

export default NewestCars;