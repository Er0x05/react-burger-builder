import React from 'react';

import BurgerII from './BurgerII/BurgerII'; 
import classes from './Burger.module.css';

const burger = ( props ) => (
    <div className={classes.Burger}>
        <BurgerII type='bread-top' />
        <BurgerII type='meat' />
        <BurgerII type='meat' />
        <BurgerII type='bread-bottom' />
    </div>
);

export default burger;