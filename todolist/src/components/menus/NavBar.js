import React from 'react';
import { Navbar } from 'react-bootstrap';

class NavBar extends React.Component {

  render() {
    return (
      <div style={{paddingTop: '20px', paddingBottom: '20px'}}>

        <Navbar className="Navbar" bg="light" variant="light" expand="lg">
          <div style={{ fontSize: '24px', color: '#00BFFF' }}>
           <i className="code icon"></i>
          </div>

          <Navbar.Brand>
            <div style={{ fontSize: '24px', color: 'lightblue' }}>
              <h3>ToDoListApp</h3>
            </div>
          </Navbar.Brand>

        </Navbar>
      </div>
    );
  }
}

export default NavBar;
