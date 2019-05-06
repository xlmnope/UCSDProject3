import React from "react";
import { Modal, Button } from "react-bootstrap"
import "./style.css";

class EntreeCard extends React.Component {
  state = {
    show: false
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  
  handleShow = () => {
    this.setState({ show: true });
  }
  
  render() {
    return <div className="card entreecard "  >
    <img className="card-img-top" src={this.props.image} alt="food"/>
    <div className="card-body">
    <h5 className="card-title">{this.props.name}</h5>
    <p className="card-text">{this.props.description}</p>
    </div>
    <button type="button" class="btn btn-primary" onClick={this.handleShow}>
    Launch demo modal
    </button>
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  }
}

export default EntreeCard;
