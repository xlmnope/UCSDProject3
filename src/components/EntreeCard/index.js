import React from "react";
import { Modal, Button, Row, Container, Col, Form } from "react-bootstrap"
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
                    <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                        Radios
                      </Form.Label>
                        <Form.Check
                          type="checkbox"
                          label="Chips"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                        />
                        <Form.Check
                          type="checkbox"
                          label="second checkbox"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                        <Form.Check
                          type="checkbox"
                          label="third checkbox"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios3"
                        />
                    </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Sign in</Button>
                    </Col>
                  </Form.Group>
                </Form>;
              
            </Col>

          </Container>

        </Modal.Body>
        <Modal.Footer>
          <div className="amnt-container">
            <button className="plus-minus">
              <svg viewBox="0 0 64 64" width="16px" height="16px" class=" ue-ec">
                <g><path d="M55 36H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h46a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"></path>
                </g>
              </svg>
            </button>
            <div class="amtnumber">1</div>
            <button className="plus-minus">
              <svg viewBox="0 0 64 64" width="16px" height="16px" class=" ue-ec">
                <path d="M56 29v6a1 1 0 0 1-1 1H36v19a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V36H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h19V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v19h19a1 1 0 0 1 1 1z"></path>
              </svg>
            </button>
          </div>
          <div className="checkoutbtn">
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
