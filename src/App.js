import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <input 
          type="button" 
          value="remove func"
          onClick={
            function(){
              setFuncShow(false)
            }
          }>
      </input>
      <input 
          type="button" 
          value="remove class"
          onClick={
            function(){
              setClassShow(false)
            }
          }>
      </input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}


var funcStyle = 'color:blue';
var funcId = 0; 
function FuncComp(props){
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
 
  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];

  var [_date, setDate] = useState((new Date()).toString());

  useEffect(function(){
    console.log('%c func => useEffect (componentDidMount) '+(++funcId), funcStyle);
    
    return function(){
      console.log('%c func => useEffect return (componentDidMount) '+(++funcId), funcStyle);
    }
  }, []);
  
  // side effect 
  useEffect(function(){
    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%c func => useEffect number return (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function(){
    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);
    document.title = _date;
    return function(){
      console.log('%c func => useEffect date return (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);
    }
  }, [_date]);


  console.log('%c func => render '+(++funcId), funcStyle);
  return (
    <div className="container">
      <h1>Function Style Comp</h1>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input 
          type="button" 
          value="random"
          onClick={
            function(){
              setNumber(Math.random())
            }
          }>
        </input>
        <input 
          type="button" value="date"
          onClick={
            function(){
              setDate((new Date()).toString())
            }
          }>
        </input>
    </div>
    );
} // end function 

var classStyle = 'color:red'
class ClassComp extends React.Component{
  state = {
    number:this.props.initNumber,
    date: (new Date()).toString()
  }
  componentWillMount(){
    console.log('%c class => componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%c class => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%c class => shouldComponentUpdate', classStyle);
    return true;
  }

  componentWillUpdate(){
    console.log('%c class => componentWillupdate', classStyle);
  }
  componentDidUpdate(){
    console.log('%c class => componentDidupdate', classStyle);
  }

  componentWillUnmount(){
    console.log('%c class => componentWillUnmount', classStyle);
  }

  render(){
     console.log('%c class => render', classStyle);
    return (
      <div className="container">
        <h1>Class Style Comp</h1>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input 
          type="button" value="random"
          onClick={
            function(){
              this.setState({number:Math.random()})
            }.bind(this)
          }>
        </input>
        <input 
          type="button" value="date"
          onClick={
            function(){
              this.setState({date:(new Date()).toString()})
            }.bind(this)
          }>
        </input>
      </div>
    )
  } 
} // end class 

export default App;
