import React from 'react';
import TodoList from './menus/TodoList';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './menus/NavBar';

class App extends React.Component {

  render(){
    return (
        <div style = {{
          padding: '10px',
          backgroundImage: 'url("https://wallpaperaccess.com/full/763117.jpg")',
          height: '2000px',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }} >

          <Container>
            <NavBar />
            <Row>
              <Col>
                <TodoList header="To Do" path="todos" />
              </Col>
              <Col>
                <TodoList header="In Progress" path="inProgress" />
              </Col>
              <Col>
                <TodoList header="Done" path="done" />
              </Col>
            </Row>
          </Container>
          </div>
    );
  }
}


export default App;
