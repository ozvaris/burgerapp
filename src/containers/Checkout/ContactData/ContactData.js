import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css"
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';

import { checkValidity} from '../../../shared/utility'


const ContactData = props => {
    const [orderForm, setOrderForm ] = useState({
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your adress'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true,
                validation:{}
            }
        });
    const [formIsValid, setFormIsValid ] = useState(false);
    
    const orderHandler = (event) => {

        event.preventDefault();
        //console.log(props.ingredients)

        const formData ={};
        for (let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
            
        }

        props.onOrderBurger(order, props.token);


    };

    

    const inputChangedHandler = (event, inputIdentifier) =>{
        
        //console.log("a");
        const updatedOrderForm = {
            ...orderForm 
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
        

    }

    const formElementArray = [];
    for(let key in orderForm){
        formElementArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    //console.log(formIsValid);
    let form = (

        <form onSubmit={orderHandler}>
            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button disabled={!formIsValid} btnType="Success" > ORDER</Button>
        </form>

    );
    if (props.loading){
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contract Data</h4>
            {form}
        </div>
    );
    
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
