import React from 'react';
import styles from './BuildControls.module.css';
import BuildContrl from './BuildControl/BuildControl';

const hardCode = [
    { lebal: 'Cheese', type: 'cheese' },
    { lebal: 'Bacon', type: 'bacon' },
    { lebal: 'Salad', type: 'salad' },
    { lebal: 'Meat', type: 'meat' }
];

const buildControls = ( props ) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        { hardCode.map( el => (
            <BuildContrl
                key={el.lebal} 
                lebal={el.lebal} 
                added={()=>props.ingredientAdded(el.type)}
                removed={()=>props.ingredientRmoved(el.type)}
                disabled={props.disabled[el.type]} />
        ) )}
    </div>
);

export default buildControls;