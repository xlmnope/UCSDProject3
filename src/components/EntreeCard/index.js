import React from "react";
import { Modal, Container, Col, Form } from "react-bootstrap"
import "./style.css";

class EntreeCard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false, 
      count: 1,
      side: "",
      options: [],
      drink: "",
      input: ""
    };
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  options = (event) => {
    console.log("====options=====");
    console.log("event.target.id: ", event.target.id);
    let options = this.state.options;
    options.push(event.target.id);
    this.setState({ options: options }); 
    console.log("this.state.options: ", this.state.options);

  }
  
  drink = (event) => {
    console.log("=====drink=====");
    console.log("event.target.id: ", event.target.id);
    this.setState({drink: event.target.id});
    console.log("this.state.drink: ", this.state.drink);

  }

  side = (event) => {
    console.log("====side=====");
    console.log("event.target.id: ", event.target.id);
    this.setState({side: event.target.id});
    console.log("this.state.side: ", this.state.side);
  }

  render() {
    let lgClose = () => {
      this.setState({ lgShow: false, count: 1, drink: "", options: [], side: "", input: "" });
    }

    return <div className="card entreecard ">
      <img className="card-img-top" onClick={() => this.setState({ lgShow: true })} src={this.props.image} alt="food" />
      <div className="card-body" onClick={() => this.setState({ lgShow: true })} >
        <h5 className="card-title">{this.props.name}</h5>
        <p className="card-text">{this.props.description}</p>
      </div>

      <Modal
        size="lg"
        show={this.state.lgShow}
        onHide={lgClose}
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable="true"
        count={this.state.count}
        handleIncrement={this.handleIncrement}
        handleDecrement={this.handleDecrement}
        side={this.side}
        options={this.options}
        drink={this.drink}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {this.props.name}    </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>

            <Col xs={12} md={6}>
              <img className="modalpic" src={this.props.image} alt="food" />
            </Col>
            <Col xs={12} md={6} className="detailcol">

              <div className="section">Select Sides</div>
              <Form>
                {['Chips'].map(side => (
                  <div key={`default-${side}`} className="mb-3 choices" onClick={this.side}>
                    <Form.Check
                      type='checkbox'
                      side={this.state.side}
                      id={`${side}`}
                      label={`${side}`}
                    />
                    <div className="price">+$2.00</div>

                  </div>
                ))}
              </Form>
              <div className="section">Choose Your Drink </div>

              <Form>
                {['Coke', 'Diet Coke', 'Sprite', 'Water'].map(drinks => (
                  <div key={`default-${drinks}`} className="mb-3 choices" onChange={this.drink}>
                    <Form.Check
                      type='checkbox'
                      drink={this.state.drink}
                      id={`${drinks}`}
                      label={`${drinks}`}
                    />
                    <div className="price">+$1.00</div>

                  </div>
                ))}
              </Form>

              <div className="section">Add Extras to {this.props.name} </div>
              <Form>
                {['Add Bacon', 'Add Grilled Onion', 'Add Grilled Jalapenos'].map(extras => (
                  <><div key={`default-${extras}`} className="mb-3 choices" onClick={this.options}>
                    <Form.Check
                      type='checkbox'
                      options={this.state.options}
                      id={`${extras}`}
                      label={`${extras}`}
                    />
                    <div className="price">+$1.00</div>
                  </div>

                  </>
                ))}
              </Form>
              <div className="section">Remove from {this.props.name} </div>
              <Form>
                {['Remove Lettuce', 'Remove Tomato', 'Remove Onion'].map(extras => (
                  <div key={`default-${extras}`} className="mb-3 choices" onClick={this.options}>
                    <Form.Check
                      type='checkbox'
                      options={this.state.options}
                      id={`${extras}`}
                      label={`${extras}`}
                    />
                  </div>
                ))}
              </Form>

            </Col>



          </Container>

        </Modal.Body>
        <Modal.Footer>
          <div className="amnt-container">
          <button className="plus-minus" onClick={this.handleDecrement}>
            <svg viewBox="0 0 64 64" width="16px" height="16px" class=" ue-ec">
              <g><path d="M55 36H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h46a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"></path>
              </g>
            </svg>
          </button>
          <div class="amtnumber">{this.state.count}</div>
          <button className="plus-minus" onClick={this.handleIncrement}>
            <svg viewBox="0 0 64 64" width="16px" height="16px" class=" ue-ec">
              <path d="M56 29v6a1 1 0 0 1-1 1H36v19a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V36H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h19V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v19h19a1 1 0 0 1 1 1z"></path>
            </svg>
          </button>
          </div>
          <div className="checkoutbtn" onClick={() => {
            this.props.calculateTotal(this.props, this.state);
            lgClose();
          }}>
            <div className="btntxt">
              Add to cart
            </div>
          </div>
          {/* add on click function to add to cart */}
        </Modal.Footer>
      </Modal>

    </div>
  }
}

export default EntreeCard;
