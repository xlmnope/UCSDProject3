import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import Pastorders from '../../components/Pastorders'
import Inprogress from '../../components/Inprogress'

export default class User extends Component {
  state = {
    menu: [],
    orders: [],
    cart: [],
    showSuccess: false
  };




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


  renderOrders = () => {
    console.log("====renderOrders====");
    console.log("this.state.orders: ", this.state.orders);
    //console.log('menuitemsArr', menuitemsArr);
    const orders = this.state.orders
    return (
      
          orders.map(order => (

            <tr>
              <td>
                <div className="orderid">
                  {order.id}
                </div>
              </td>
              <td>
                <div className="name">
                  {order.items[0]}
                </div>
              </td>
              <td>
                <div className="createdAt">
                  {order.createdAt}
                </div>
              </td>
            </tr>
          )
    ))
  }



componentDidMount = () => {
  // Make an API request to get the data...
  fetch("/api/orders")
    .then(response => response.json())
    // Call setState with the result of the API request

    .then(
      (result) => {
        console.log("result ", result);
        //console.log("result[0]", result[0]);
        this.setState({
          isLoaded: true,
          orders: result
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




render() {
  return (
    <React.Fragment>
      <NavBar />

      <FilterBar />

      <Row>
        <Container>
          <Inprogress
            renderOrders={this.renderOrders}
          />
          {/* <Pastorders/> */}


        </Container>

      </Row>

    </React.Fragment>

  )
}
}