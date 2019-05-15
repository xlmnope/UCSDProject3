import React, { Component }  from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import FilterBar from './Components/FilterBar';
import EntreeCard from './Components/EntreeCard';
import menu from "./menu.json";
import CheckoutCard from "./Components/CheckoutCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Shelf from './Components/FloatCart';
import FloatCart from './Components/Shelf';




class App extends Component {
  state = {
    menu,
    score: 0,
    highscore: 0
  }; 

  renderItems = () => {
    let returnArr = [];
    const menuitemsArr = this.state.menu.slice(0);
    console.log('menuitemsArr', menuitemsArr);
    for (var i = 0; i < menuitemsArr.length; i++) {
      const twomenuitems = menuitemsArr.splice(0,2)
      returnArr.push(this.renderMenuItems(twomenuitems));
    }
  
    console.log(returnArr)
    return returnArr;
    
  }

  renderMenuItems = (twomenuitems) => {
    console.log("twomenuitems: ", twomenuitems)
    return  (
      <React.Fragment>
      
      <EntreeCard
              id={twomenuitems[0].id}
              key={twomenuitems[0].id}
              name={twomenuitems[0].name}
              image={twomenuitems[0].image}
              price={twomenuitems[0].price}
              description={twomenuitems[0].description}
            />
          { twomenuitems[1] ? <EntreeCard
              id={twomenuitems[1].id}
              key={twomenuitems[1].id}
              name={twomenuitems[1].name}
              image={twomenuitems[1].image}
              price={twomenuitems[1].price}
              description={twomenuitems[1].description}
            /> : null }
</React.Fragment>
    )
  }

  render(){
    return (
      <React.Fragment>
        <NavBar/> 
        <Header/>
        <FilterBar/>
        <Shelf/>
        <FloatCart/>

      <Row>
        <Container>
        <Col>
          { this.renderItems() }
        </Col>
        <Col xs={4}>
          <CheckoutCard/>
        </Col>
        </Container>

      </Row>

      </React.Fragment>  
            );
  }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
}

export default App;

