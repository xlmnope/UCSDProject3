import React from "react";
import { Modal, Button, Container, Col, Form } from "react-bootstrap"
import "./style.css";

class EntreeCard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false
    };
  }



  render() {
    let lgClose = () => {
      this.setState({ lgShow: false });
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
                  <div key={`default-${side}`} className="mb-3 choices">
                    <Form.Check
                      type='checkbox'
                      id={`default-${side}`}
                      label={`${side}`}
                    />
                   <div className="price">+$1.00</div>

                  </div>
                ))}
             </Form>
              <div className="section">Choose Your Drink </div>

              <Form>
                {['Coke', 'Diet Coke', 'Sprite', 'Water'].map(drinks => (
                  <div key={`default-${drinks}`} className="mb-3 choices">
                    <Form.Check
                      type='checkbox'
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
                  <><div key={`default-${extras}`} className="mb-3 choices">
                    <Form.Check
                      type='checkbox'
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
                  <div key={`default-${extras}`} className="mb-3 choices">
                    <Form.Check
                      type='checkbox'
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
        <div className="checkoutbtn">Add to cart</div>
        </Modal.Footer>
      </Modal>

    </div>
  }
}

export default EntreeCard;
