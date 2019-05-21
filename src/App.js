import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import EntreeCard from './components/EntreeCard';
import CheckoutCard from "./components/CheckoutCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

class App extends Component {
  state = {
    menu: [],
    cart: []
  };

  addtocart = (name) => {
    //alert("click add to cart");
    console.log("addtocartfunction");
    let cart = this.state.cart;
    cart.push(name);
    this.setState({
      cart: cart
    }, ()=>{
      console.log("this.state.cart: ", this.state.cart);
    });
  }

  checkout = () => {
    //alert("checkout");
    console.log("checkoutbutton");
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: this.state.cart
      })
    })
    this.setState({
      cart:[]
    });
  }
  //remove item from cart function
  //remove item from cart


  componentDidMount = () => {
    console.log("is this working")
    // Make an API request to get the data...
    fetch("/api/items")
    .then(response => response.json())
    // Call setState with the result of the API request
 
      .then(
        (result) => {
          console.log("result ", result);
          console.log("result[0]", result[0]);
          this.setState({
            isLoaded: true,
            menu: result
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  renderItems = () => {
    let returnArr = [];
    //console.log("menu: ", this.state.menu);
    const menuitemsArr = this.state.menu.slice(0);
    //console.log('menuitemsArr', menuitemsArr);
    for (var i = 0; i < menuitemsArr.length; i++) {
      const twomenuitems = menuitemsArr.splice(0, 2)
      returnArr.push(this.renderMenuItems(twomenuitems));
    }

    console.log("return arr", returnArr);
    return returnArr;

  }

  renderMenuItems = (twomenuitems) => {
    console.log("twomenuitems: ", twomenuitems)
    return (
      <React.Fragment>

        <EntreeCard
          id={twomenuitems[0].id}
          key={twomenuitems[0].id}
          name={twomenuitems[0].item}
          image={twomenuitems[0].image}
          price={twomenuitems[0].price}
          description={twomenuitems[0].description}
          addtocart={this.addtocart}
        />
        {twomenuitems[1] ? <EntreeCard
          id={twomenuitems[1].id}
          key={twomenuitems[1].id}
          name={twomenuitems[1].item}
          image={twomenuitems[1].image}
          price={twomenuitems[1].price}
          description={twomenuitems[1].description}
          addtocart={this.addtocart}
        /> : null}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Header />
        <FilterBar />

        <Row>
          <Container>
            <Col>
              {this.renderItems()}
            </Col>
            <Col xs={4}>
              <CheckoutCard 
                cart={this.state.cart}
                checkout={this.checkout}
              />
            </Col>

          </Container>

        </Row>

      </React.Fragment>
    );
  }

}

export default App;

