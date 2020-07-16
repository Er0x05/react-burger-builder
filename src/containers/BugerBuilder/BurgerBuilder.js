import React from "react";

import Burger from '../../compunents/Burger/Burger';
import BuildControls from '../../compunents/Burger/BuildControls/BuildControls';
import Modal from '../../compunents/UI/Modal/Modal';
import OrderSummary from '../../compunents/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 1,
    cheese: 0.4,
    meat: 1.2
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,el)=>(sum+el),0);
        this.setState({purchasable: sum>0});
        console.log(sum,this.state.purchasable)
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) return;
        const updateCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCloseHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue!')
    }

    render(){

        const disabledInfo = { ...this.state.ingredients };
        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        
        return(
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    close={this.purchaseCloseHandler}>
                        <OrderSummary 
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            purchaseCanceled={this.purchaseCloseHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                             />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRmoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </React.Fragment>
        )
    }
};

export default BurgerBuilder;