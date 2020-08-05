import React from "react";

import Burger from '../../compunents/Burger/Burger';
import BuildControls from '../../compunents/Burger/BuildControls/BuildControls';
import Modal from '../../compunents/UI/Modal/Modal';
import OrderSummary from '../../compunents/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../compunents/UI/Modal/Spinner/Spinner';
import ErrorHandler from "../../compunents/UI/Hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 1,
    cheese: 0.4,
    meat: 1.2
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        Axios.get('/ingredients.json')
            .then( res => {
                this.setState({ ingredients: res.data, error: false })
            })
            .catch( err => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,el)=>(sum+el),0);
        this.setState({purchasable: sum>0});
        // console.log(sum,this.state.purchasable)
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
        // alert('You continue!')
        this.setState({ loading:true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Max Schwarzuls',
                address: {
                    street: 'Teststrees 1',
                    zipCode: '12313',
                    country: 'Singapore'
                },
                email:'sfsdf@fsdfsd.com'
            },
            deliveryMethod: 'ASAP'
        };
        Axios.post('/orders.json',order)
            .then( res => {
                console.log(res);
                this.setState({ loading: false, purchasing: false });
            })
            .catch( err => {
                console.log(err);
                this.setState({ loading: false, purchasing: false });
            })
    }

    render(){

        const disabledInfo = { ...this.state.ingredients };
        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let burger = this.state.error ? <p>Ingredients have been read with error.</p> : <Spinner />;
        let orderSummary = <Spinner />;
        if ( this.state.ingredients ){
            burger = <React.Fragment>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRmoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            price={this.state.totalPrice} />
                    </React.Fragment>;
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            purchaseCanceled={this.purchaseCloseHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            />
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }
        
        return(
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    close={this.purchaseCloseHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
};

export default ErrorHandler(BurgerBuilder, Axios);