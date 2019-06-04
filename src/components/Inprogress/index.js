import React from "react";
//import "./style.css";
import Table from 'react-bootstrap/Table'



function inProgress(props) {
  console.log("inprogress props: ", props);

  return <div>
    <div className="ordercontainer">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Items</th>
            <th>Order Created Time</th>
          </tr>
        </thead>
        <tbody>
          {props.renderOrders()}
        </tbody>
      </Table>
    </div>
  </div>
}

export default inProgress;
