import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
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
    cart: [],
    showSuccess: false
  };

  calculateTotal = (item, state) => {
    console.log("===calculate total===");
    console.log("item: ", item);
    console.log("state: ", state);
    let totalprice = Number(item.price);
    if (state.options.length > 0){
      console.log("calculating options: ")
      for (let i=0; i<state.options.length; i++){
         totalprice++;
         console.log("for loop", i, totalprice)

      }
    }
    if (state.drink !== ""){
      console.log("calculating drink ", totalprice );
      totalprice++;
      console.log("drink: ", totalprice)
    }
    if (state.side !== ""){
      console.log("calculating side: ", totalprice)
      totalprice += 2;
      console.log("side: ", totalprice);

    }
    if (state.count > 1){
      console.log("calculating amount: ", totalprice)
      totalprice = totalprice * state.count;
      console.log("amount new total: ", totalprice);

    }
    let cart = this.state.cart;
    let cartobj = {
      name: item.name,
      count: state.count,
      price: totalprice,
      options: state.options,
      side: state.side,
      drink: state.drink
    }
    cart.push(cartobj);
    this.addtocart(cart);
  }

  addtocart = (cart) => {
    console.log("===addtocartfunction===");
    console.log("cart: ",cart);
    this.setState({
      cart: cart
    }, () => {
      console.log("this.state.cart: ", this.state.cart);
    });
  }

  checkout = () => {
    console.log("checkoutbutton");
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: this.state.cart
      })

    });

    this.setState({
      cart: [],
      showSuccess: true
    });
    setTimeout(() => { this.setState({ showSuccess: false }); }, 3000);

  }


  //remove item from cart function
  //remove item from cart


  componentDidMount = () => {
    // Make an API request to get the data...
    fetch("/api/items")
      .then(response => response.json())
      // Call setState with the result of the API request

      .then(
        (result) => {
          //console.log("result ", result);
          //console.log("result[0]", result[0]);
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

  renderOptions = (count) => {
    console.log("====renderoptions====");
    console.log("count: ",count);
    let returnArr = []
    for (var i = 0; i < 10; i++) {
      if (i+1 === count) {
          returnArr.push(<option selected> {i+1} </option>)
      }
      else {
        returnArr.push(<option> {i+1} </option>)
      }

    }
    console.log(returnArr);
    return (
      returnArr
    )

  }

  renderMenuItems = (twomenuitems) => {
    //console.log("twomenuitems: ", twomenuitems)
    return (
      <React.Fragment>

        <EntreeCard
          id={twomenuitems[0].id}
          key={twomenuitems[0].id}
          name={twomenuitems[0].item}
          image={twomenuitems[0].image}
          price={twomenuitems[0].price}
          description={twomenuitems[0].description}
          calculateTotal={this.calculateTotal}
          addtocart={this.addtocart}
        />
        {twomenuitems[1] ? <EntreeCard
          id={twomenuitems[1].id}
          key={twomenuitems[1].id}
          name={twomenuitems[1].item}
          image={twomenuitems[1].image}
          price={twomenuitems[1].price}
          description={twomenuitems[1].description}
          calculateTotal={this.calculateTotal}
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
                renderOptions={this.renderOptions}
              />
              <Alert variant="success"
                show={this.state.showSuccess}>
                Your order is in!
              </Alert>
            </Col>

          </Container>

        </Row>

      </React.Fragment>
    );
  }
}


export default App;

