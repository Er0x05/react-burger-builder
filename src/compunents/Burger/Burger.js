import React from 'react';

import BurgerII from './BurgerII/BurgerII'; 
import classes from './Burger.module.css';

const burger = ( props ) => {
    let transformedIngredients = Object.keys(props.ingredients).map( igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerII key={igKey+i} type={igKey} />
        })
    })
    .reduce((arr, el)=>{
        return arr.concat(el)
    },[]);
    if ( transformedIngredients.length === 0 ) transformedIngredients = <p>Please start adding ingredients!</p>;
    console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerII type='bread-top' />
            {transformedIngredients}
            <BurgerII type='bread-bottom' />
        </div>
    )
};

export default burger;