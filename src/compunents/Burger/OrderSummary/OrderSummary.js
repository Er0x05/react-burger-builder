import React from 'react';

const orderSummary = ( props ) => {
    
    const orderStatistics = Object.keys(props.ingredients).map(igKey=>(
        <li>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        </li>
    ));

    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderStatistics}
            </ul>
            <p>Continue to checkout?</p>
        </React.Fragment>
    )
};

export default orderSummary;