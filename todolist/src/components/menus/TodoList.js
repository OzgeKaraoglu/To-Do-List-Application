import React from 'react';
import axios from '../../apis/httpClient';
import TodoListStyle from './TodoListStyle.css';

class TodoList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: '',
      path: props.path,
      isEditing: false,
      header: props.header,
      plusShown: false
    };
    this.pullData = this.pullData.bind(this)
    this.body = this.body.bind(this)
    this.onHandleClick = this.onHandleClick.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)
    this.onHandleDeleteClick = this.onHandleDeleteClick.bind(this)
    this.footer = this.footer.bind(this)
    this.onHandleFooterClick = this.onHandleFooterClick.bind(this)
    this.shownFooter = this.shownFooter.bind(this)
  }


  componentDidMount() {
    this.pullData();
  }

  onHandleChange(event){
    this.setState({value: event.target.value});
  }

  onHandleClick(event){
    const s = this.state;
    s.isEditing = !s.isEditing
    this.setState(s)
  }

  onHandleDeleteClick(event){
    const id = event.target.id;
    axios.delete(`/${this.state.path}/${id}`)
        .then(response =>
              this.pullData()
           )
        .catch(error =>
              console.log(error)
            )
  }

  onHandleFooterClick(event){
    axios.post(`/${this.state.path}`, { content: this.state.value })
          .then(response =>
                this.pullData()
              )
          .catch(error =>
                console.log(error)
              )
    event.preventDefault();
  }

  pullData(){
    axios.get(`/${this.state.path}`)
          .then(response =>{
              this.setState({...this.state, data: response.data})
          }
        )
  }

  shownFooter() {
    const s = this.state;
    s.plusShown = !this.state.plusShown;
    this.setState(s);
  }

  header(){
    const btnText = this.state.isEditing ? "Done" : "Edit";
    const icon = this.state.isEditing ? "hand peace icon" : "edit icon"

    return (
        <div className="item" >
          <div className="container-fluid">
              <div id="rowHeader" className="row">
                  <h4 id="title" className="col">{this.state.header}</h4>
                  <div>
                    <button
                      style={{textAlign: 'right', visibility: "visible", borderRadius: "15px"}}
                      className="ui primary button"
                      onClick={this.onHandleClick}
                    >
                      <i className={icon}></i>
                      {btnText}
                    </button>
                  </div>
              </div>
          </div>
      </div>
    );
  }


  body() {
     const v = this.state.isEditing ? "visible" : "hidden";

     return (
       <div>
       {this.state.data.map(todo =>
        <div className="item" key={todo.id}>
        <div className="container-fluid">
            <div id="rowContent" className="row">
              <div id="content" className="col"><h6>{todo.content}</h6></div>
              <button
                    style={{textAlign: 'right', visibility: v, borderRadius: '25px' }}
                    className="ui button"
                    onClick={this.onHandleDeleteClick}
                    id={todo.id}
                    >
                    Delete
              </button>
            </div>
            <br />
          </div>
        </div>
      )}
      </div>
    );
  }


    footer(){
      const shown = this.state.plusShown ? "visible" : "hidden";

      return (
        <div style={{ visibility: shown }} id="footer" className="ui form">
          <div className="field" onChange={this.onHandleChange}>
          <div
            style={{textAlign: 'right', color: 'lightblue', visibility: 'visible'}}
            className="addTask" onClick={this.shownFooter}>
            <i className="plus icon"></i>
          </div>
            <input
              style={{ borderRadius: '8px'}}
              type="text"
              name="todo"
              required/>
          </div>
          <button className="ui primary button" onClick={this.onHandleFooterClick} type="submit">CREATE</button>
        </div>
      );
    }


  render() {
      return (<div className="MyComponent">
                {this.header()}
                  <br />
                {this.body()}
                  <br />
                {this.footer()}
              </div>);

  }
}

export default TodoList;
