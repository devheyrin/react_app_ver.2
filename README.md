# React class vs. function style 



리액트는 두 가지 방법으로 컴포넌트를 만든다. 하나는 class를 사용하는 것, 하나는 function을 사용하는 것이다. 

클래스는 리액트의 기능을 full power로 사용할 수 있지만, 클래스의 문법을 따로 알아야만 하고, 다소 장황하다

반대로 함수 스타일 코딩은 함수 문법만 알면 사용할 수 있지만, 기능이 부족하다. 함수 스타일로 구현할 수 없었던 대표적 작업이 컴포넌트 내부에 state를 만들어 사용하는 것이었다. 또한 life cycle API를 사용할 수도 없었다. 그래서 함수 방식은 단순한 컴포넌트를 만드는 데에만 사용되어왔다. 

그러나! 최신 리액트에서는 Hook이라는 개념이 도입되어 함수 방식에서도 내부적으로 상태를 다룰 수 있게 되었고, 컴포넌트의 life cycle에 따라 해야 할 작업을 정의할 수 있게 되었다. 이로 인해 함수형 스타일이 class 스타일의 강력한 경쟁자로 급부상하게 되었다.



## 개발 환경 세팅하기 

클래스 스타일과 함수 스타일의 차이를 간단히 알아보기 위한 예제 프로젝트를 만들어 보자. 

새 폴더를 생성하고, `npx create-react-app .`으로 리액트 프로젝트를 만든다. 

index.css와 App.css에 들어 있던 내용을 모두 지우고, App.js를 다음 내용으로 채워보자. 

```react
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      Hello World!
      <FuncComp></FuncComp>
      <ClassComp></ClassComp>
    </div>
  );
}

//함수 스타일 
function FuncComp(){
  return (
    <div className="container">
      <h1>Function Style Comp</h1>
    </div>
    );
}

//클래스 스타일 
class ClassComp extends React.Component{
  render(){
    return (
      <div className="container">
        <h1>Class Style Comp</h1>
      </div>
    )
  }
}

export default App;
```

함수형 컴포넌트는 return으로 화면에 보여질 컴포넌트의 내용을 작성하면 되고, 클래스형 컴포넌트는 render 함수로 하여금 컴포넌트의 내용을 return 하게 만든다는 것을 알 수 있다. 

두 컴포넌트를 구분하기 위해 App.css를 수정해보자. 

```css
.App, .container{
    border: 5px solid red;
    margin: 5px;
    padding: 5px;
}
```

![image-20210604171900440](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604171900440.png)



## 클래스에서 state 사용하기 

이제 각각의 컴포넌트에 값을 주고, 이 값을 클래스에서 받도록 해 보자. 

```react
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      Hello World!
          <!-- 1. initNumber라는 이름으로 값을 줘 보자. -->
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}


class ClassComp extends React.Component{
  render(){
    return (
      <div className="container">
        <h1>Class Style Comp</h1>
             <!-- 2. 클래스에서는 이렇게 값을 받아올 수 있다.  -->
        <p>Number : {this.props.initNumber}</p>
      </div>
    )
  }
}

export default App;
```

클래스형 컴포넌트라면 this.props를 사용해 값을 받아올 수 있다. 

```

```

함수형 컴포넌트라면 this를 사용하지 않는다. FuncComp라는 함수를 리액트가 호출할 때 첫 번째 파라미터의 인자값으로 전달된 props 값을 전달하도록 약속되어있다. 이 인자를 props라고 부르기로 하면, props.initNumber로 값을 받아올 수 있다. 

이 때 props는 단지 변수의 이름일 뿐이지, 어떤 이름을 주어도 상관이 없다. 함수의 첫 번째 인자로 컴포넌트의 props를 전달한다는 것이 중요! 



그렇다면 state는 클래스와 함수에서 각각 어떻게 사용될 수 있을까? 

```react
class ClassComp extends React.Component{
    //1. state값을 세팅(초기화)한다. 
    //props로 전달한 initNumber값을 number라는 이름으로 받아온다. 
  state = {
    number:this.props.initNumber
  }

  render(){
    return (
      <div className="container">
        <h1>Class Style Comp</h1>
        <p>Number : {this.state.number}</p>
<!-- state의 변화를 보기 위해 랜덤한 숫자를 생성해 화면에 뿌려주는 버튼을 생성한다 -->
        <input 
          type="button" 
          value="random"
          onClick={
            function(){
                //setState를 통해 state값을 변경 
              this.setState({number:Math.random()})
            }.bind(this)
          }>
        </input>
      </div>
    )
  }
```



## 함수에서 state 사용법 - Hook 

Hook의 특징은 이름이 use로 시작한다는 것! useState라는 훅은 페이스북이 제공하는 내장된 hook이다. 이것을 사용할 수도 있고 사용자 정의 훅을 사용할 수도 있다. 

useState를 사용하려면 `React.useState()` 이런 식으로 React로부터 useState라는 함수를 호출해야 한다. 그런데 매번 이렇게 쓰는 것이 귀찮으니 import할때 `{useState}`를 같이 import 해주면 `useState()` 만으로도 함수를 호출할 수 있다. 

```react
import React, {useState} from 'react';
import './App.css';

function FuncComp(props){
  var numberState = useState();
    // useState를 사용하면 어떤 결과가 저장되는지 보기 위해 console에 출력해본다. 
  console.log('state',numberState);
  return (
    <div className="container">
      <h1>Function Style Comp</h1>
      <p>Number : {props.initNumber}</p>
    </div>
    );
}
```

콘솔에서 확인해 보면 두 개의 값을 가진 배열이 리턴되는것을 볼 수 있다. 배열 중 첫번째(0번째)값이 우리가 원하는 state값이 될 것이다. 이것을 props.initNumber자리에 넣으면 state값을 화면에 보여줄 수 있을 것이다. 

![image-20210604175454936](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604175454936.png)

```react
function FuncComp(props){
  var numberState = useState();
  var number = numberState[0];
  console.log('state',numberState);
  return (
    <div className="container">
      <h1>Function Style Comp</h1>
      <p>Number : {number}</p>
    </div>
    );
}
```

![image-20210604175719722](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604175719722.png)

현재는 초기값으로 아무 것도 주어지지 않았기 때문에 undefined상태이므로 공백으로 출력된다. 

props를 통해 전달된 값을 주기 위해서는 useState의 첫 번째 인자로 그 값을 준다. 

```react
function FuncComp(props){
    // useState의 첫 번째 인자로 값을 전달한다. 
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  console.log('state',numberState);
  return (
    <div className="container">
      <h1>Function Style Comp</h1>
      <p>Number : {number}</p>
    </div>
    );
}
```

![image-20210604180034211](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604180034211.png)

값을 전달한 후 콘솔을 확인해 보면 배열의 0번째에 initNumber의 값인 2가 들어가있음을 확인할 수 있다.

props.initNumber 대신 숫자 5를 입력하면 배열의 0번째 값이 5가 된다. 

useState에 어떠한 값을 전달하면, 지금 만드는 state의 초기값이 된다. 그렇게 리턴된 값의 첫 번째 자리가 그 값이 되고, 이것을 사용해 class에서 state를 정의했을 때와 같은 일을 할 수 있다. 

이제 함수형 컴포넌트에서도 random 버튼을 클릭했을 때 화면에 출력되는 숫자가 바뀌도록 코드를 수정해보자. useState를 사용할 때 배열의 첫 번째 값은 state값이었는데, 두 번째 값은 이 state를 변경시킬 수 있는 함수이다. 

이 함수를 setNumber라는 변수로 저장해서 사용하기로 한다. 

```react
function FuncComp(props){  
    var numberState = useState(props.initNumber);  
    var number = numberState[0];    
    //state를 바꿀 수 있는 함수를 setNumber라는 변수에 저장한다.   
    var setNumber = numberState[1];  
    console.log('state',numberState);  
    return (    
        <div className="container">      
            <h1>Function Style Comp</h1>      
            <p>Number : {number}</p>      
            <input           
                type="button"           
                value="random"          
                onClick={            
                    function(){
                        // 바꾸고자 하는 값을 setNumber안에 인자로 넣어준다.
                        setNumber(Math.random())            
                    }          
                }>        
            </input>    
        </div>    
    );}
```

이제 클래스와 함수형 각각의 방법으로 날짜를 표시하도록 만들어 보자. 

#### 클래스형

```react
class ClassComp extends React.Component{  
    state = {    
        number:this.props.initNumber,      
        //시스템의 현재 날짜를 받아와서 date라는 state의 초기값으로 준다.     
        date: (new Date()).toString()  
    }  
render(){    
    return (      
        <div className="container">        
            <h1>Class Style Comp</h1>        
            <p>Number : {this.state.number}</p>        
            <!--날짜가 들어갈 자리-->        
            <p>Date : {this.state.date}</p>        
            <input           
                type="button" 
                value="random"          
                onClick={            
                    function(){              
                        this.setState({number:Math.random()})            
                    }.bind(this)          
                }>        
            </input>    
            <!--버튼을 누를 때마다 시간이 갱신되도록 state를 변경한다-->        
            <input           
                type="button"
                value="date"          
                onClick={            
                    function(){              
                        this.setState({date:(new Date()).toString()})            
                    }.bind(this)          
                }>        
            </input>      
        </div>    
    )} 
}// end class 
```

#### 함수형

```react
function FuncComp(props){  var numberState = useState(props.initNumber);  var number = numberState[0];  var setNumber = numberState[1];   // 마찬가지로 useState를 사용하되, 초기값을 현재날짜 구하는 코드로 준다.     var dateState = useState((new Date()).toString());  // 배열의 0번째 값은 현재날짜  var _date = dateState[0];  // 배열의 1번째 값은 state 변경 함수   var setDate = dateState[1];  console.log('state',numberState);  return (    <div className="container">      <h1>Function Style Comp</h1>      <p>Number : {number}</p>      <p>Date : {_date}</p>      <input           type="button"           value="random"          onClick={            function(){              setNumber(Math.random())            }          }>        </input>    <!--버튼을 누를 때마다 시간이 갱신되도록 state를 변경한다-->        <input           type="button" value="date"          onClick={            function(){              setDate((new Date()).toString())            }          }>        </input>    </div>    );} // end function 
```

useState를 사용한 세 줄의 코드는 다음과 같이 줄여서 표현할 수도 있다. 

```react
// var dateState = useState((new Date()).toString());  // var _date = dateState[0];  // var setDate = dateState[1];  var [_date, setDate] = useState((new Date()).toString());
```



## Life Cycle 구현하기 



### class 에서 구현하기 

class 컴포넌트 안쪽에서 다음 메소드들을 넣어 lifecycle을 관찰해보자. 

```react
var classStyle = 'color:red'class ClassComp extends React.Component{  state = {    number:this.props.initNumber,    date: (new Date()).toString()  }  componentWillMount(){    console.log('%c class => componentWillMount', classStyle);  }  componentDidMount(){    console.log('%c class => componentDidMount', classStyle);  }  render(){     console.log('%c class => render', classStyle);    return (      <div className="container">        <h1>Class Style Comp</h1>        <p>Number : {this.state.number}</p>        <p>Date : {this.state.date}</p>        <input           type="button" value="random"          onClick={            function(){              this.setState({number:Math.random()})            }.bind(this)          }>        </input>        <input           type="button" value="date"          onClick={            function(){              this.setState({date:(new Date()).toString()})            }.bind(this)          }>        </input>      </div>    )  } } // end class 
```

화면은 다음과 같이 나타난다. 

![image-20210604225458210](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604225458210.png)

componentWillMount => render => componentDidMount 순서대로 호출된다는 것을 볼 수 있다.  

따라서 render되기 전에 해야 할 일은 componentWillMount 메소드를 구현에 그 안에 작성해두면 react가 이 메소드를 호출할 것이므로 render되기 전에 그 내용이 실행될 것이다. 

화면에 내용이 그려진 다음 처리해야할 일이 있다면 이것은 componentDidMount를 통해서 넣어줄 수 있을 것이다. (ex. 화면이 그려진 후 Dom 처리, 네트워크로부터 다운받아서 처리 등)



다음으로는 state가 변화하면서 화면이 변할 때 lifecycle을 관찰해보자. 

```react
componentWillMount(){    console.log('%c class => componentWillMount', classStyle);  }  componentDidMount(){    console.log('%c class => componentDidMount', classStyle);  }  shouldComponentUpdate(nextProps, nextState){    console.log('%c class => shouldComponentUpdate', classStyle);    return true;  }  componentWillUpdate(){    console.log('%c class => componentWillupdate', classStyle);  }  componentDidUpdate(){    console.log('%c class => componentDidupdate', classStyle);  }
```

state를 변화시킬 때 console에 출력되는 내용은 다음과 같다. 

![image-20210604230447011](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604230447011.png)

가장 먼저 shouldComponentUpdate가 호출된다. 이 메소드는 컴포넌트가 호출되었을 때 true를 리턴한다면 컴포넌트가 업데이트될 것이므로 componentWillUpdate가 호출된다. 그 다음으로 render가 다시 호출되고, componentDidUpdate가 호출된다. 

이 라이프사이클에 따라 우리가 원하는 타이밍에 어떠한 코드를 호출하고 싶다면 정해진이름의 메소드의 '내용'을 구현함으로써 적당한 타이밍에 원하는 코드를 실행할 수 있도록 되어있다. 이전에는 이런 일은 클래스 방식으로만 가능한 일이었다. 

그러나! hook을 통해 이제는 함수 방식으로도 라이프사이클에 따른 코드 실행이 가능해졌다. 



#### function에서 구현하기 

함수 방식에서 라이프사이클을 구현하려면 우선 useEffect라는 hook을 사용해야한다. 다음과 같이 import한다. 

```react
import React, {useState, useEffect} from 'react';
```

이제 hook을 사용해보자. 

```react
var funcStyle = 'color:blue';var funcId = 0; function FuncComp(props){  var numberState = useState(props.initNumber);  var number = numberState[0];  var setNumber = numberState[1];   // var dateState = useState((new Date()).toString());  // var _date = dateState[0];  // var setDate = dateState[1];  var [_date, setDate] = useState((new Date()).toString());  useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);  });  console.log('%c func => render '+(++funcId), funcStyle);  return (    <div className="container">      <h1>Function Style Comp</h1>      <p>Number : {number}</p>      <p>Date : {_date}</p>      <input           type="button"           value="random"          onClick={            function(){              setNumber(Math.random())            }          }>        </input>        <input           type="button" value="date"          onClick={            function(){              setDate((new Date()).toString())            }          }>        </input>    </div>    );} // end function 
```

![image-20210604235652461](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604235652461.png)

![image-20210604235704914](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210604235704914.png)

콘솔을 통해 살펴보면 render가 된 후, 즉 화면이 그려진 후 useEffect 함수가 실행된다는 것을 알 수 있다. 또 random 또는 date버튼을 눌러 state를 변화시킬때마다 render가 실행되고, useEffect가 실행되는 것을 볼 수 있다. 

이를 class의 생애주기와 비교해보면 render가 호출된 후에 호출되는 componentDidMount & componentDidupdate 의 역할을 useEffect가 하고 있다는 것을 알 수 있다. 



왜 이름이 Effect 인가? 사실은 sideEffect의 의미이다. 

react에서 Main Effect는 컴포넌트를 그리는 것이라고 할 수 있다. 그 주 임무에서 벗어나는 작업들, 예를들면 렌더링 후 컴포넌트의 정보를 가져와 내용을 변경시키거나, 문서 제목을 바꾸는 등의 작업을 할 수 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect  (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number + ':' + _date;  });
```

이처럼 타이틀을 바꾼다는 것은 컴포넌트의 렌더링과는 상관없이 벌어지는, 예외적인 상황이다. 이런 것들을 sideEffect라고 하고, 이것들을 적당한 타이밍에 실행되도록 하는 것이 기존의 class에서는 comnentWillMount나 componentDidMount같은 라이프사이클 API였던 것이다. 그것을 function 안에서도 구현할 수 있도록 만들어진 API가 useEffect이고, 이 안에 코드를 작성하면 comnentWillMount 또는 componentDidMount 와 같은 순간에 코드를 실행할 수 있다는 것! 

+) useEffect를 여러 개 사용할 수 있다. 아래처럼 useEffect 두 개를 만들고 실행해보면 두 개가 호출되는 것을 확인할 수 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect A (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number + ':' + _date;  });useEffect(function(){    console.log('%c func => useEffect B (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number + ':' + _date;  });
```



#### Clean Up

????? 알다가도 모르겠네 

useEffect에 return 값을 함수로 주어서 clean up, 정리하는 작업을 할 수 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number + ':' + _date;    return function(){      console.log('%c func => useEffect return (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    }  });
```

![image-20210605002556674](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210605002556674.png)

콘솔을 통해 살펴보면, 가장 먼저 페이지가 로드되면서 render가 실행된다. 그 다음으로는 useEffect가 실행된다. random 이나 date를 눌러 state를 변화시키면 다시 useEffect가 실행되는데, 이때 useEffect함수가 실행되기 전에! useEffect의 리턴값으로 준 함수가 실행된다!!! 그 다음으로 useEffect가 실행된다. 새 화면을 그리고 나서 어떤 작업을 수행하기 전에 이전 상태를 정리하는 느낌? 으로 보면 될 것 같다. 

왜 이런 기능이 있어야 할까? 

예를들어 componentDidMount 함수안에 구독하는 기능을 넣어두었다고하자. 화면이 그려지고나서 구독 기능이 처리되는 상황이다. 구독 취소 기능은 componentWillUnmount, 즉 어떤 컴포넌트가 사라질 때 처리된다. 컴포넌트가 생기고 나서 무언가를 구독하는 작업을 했는데, 컴포넌트가 사라지고나서도 구독을 유지하고 있으면 불필요한 자원을 차지할 수 있기 때문에, 컴포넌트가 사라질 때는 구독을 취소하도록 하는 것이다. 

이 예제를 useEffect로 처리한다면, useEffect가 실행될때 구독을 처리하고, return 값으로 함수를 주면서 그 안에 구독을 취소하는 처리를 하게 만들 수 있다. 즉 useEffect가 실행될때 이전 내용을 정리하도록 return 값으로 준 함수가 호출되도록 약속되어있다는 것이다 

**??? 잘 모르겠어요! **



#### Skipping Effect

성능을 높이기 위한 방법중 하나로, 현재state값과 변경된 state값을 비교해서 두 개가 다를 때만 작업을 처리하도록 한다. 

useEffect를 사용하면 매우 간단하게 그 작업을 처리할 수 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number;  }, [number]);
```

이렇게 콜백 함수 뒤에 변경 여부를 감시하고자 하는 변수를 [ ]안에 넣어서 적어주면, (여기서는 number) 해당 변수에 변화가 감지되었을때만 콜백함수가 호출되도록 할 수 있다! console로 확인해보자. 



 number 의 상태를 변화시키는 데 아무 관련이 없는 date 버튼을 누르자 콜백함수는 호출되지 않고  render만 호출되고 있음을 확인할 수 있다. (노란색) 

random 버튼을 눌러야만 number값에 변화가 생겨 useEffect가 호출되었다. (빨간색)

![image-20210605004521135](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210605004521135.png)

date의 변화도 감시하고싶다면 똑같은 방식의 코드를 적어주면 된다. 

```react
useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number;  }, [number]);useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = _date;  }, [_date]);
```

cleanup 함수도 추가해보면 각각의 변경이 있을 때마다 해당 return 함수만 호출되는 것을 확인할 수 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = number;    return function(){      console.log('%c func => useEffect number return (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    }  }, [number]);useEffect(function(){    console.log('%c func => useEffect (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    document.title = _date;    return function(){      console.log('%c func => useEffect date return (componentDidMount & componentDidupdate)'+(++funcId), funcStyle);    }  }, [_date]);
```

![image-20210605004938666](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210605004938666.png)

useEffect의 두 번째 인자로 빈 배열을 주면 화면이 컴포넌트가 최초로 생성될 때 딱 한번만 실행되도록 할 수도 있다. 

```react
useEffect(function(){    console.log('%c func => useEffect (componentDidMount) '+(++funcId), funcStyle);    document.title = number;    return function(){      console.log('%c func => useEffect return (componentDidMount) '+(++funcId), funcStyle);    }  }, []);
```

![image-20210605005549845](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210605005549845.png)

 

#### 부모 컴포넌트(App)에서 자식 컴포넌트 변경하기

버튼을 눌러 FuncComp를 숨길 수 있도록 구현해보자. 

우선 FuncComp를 보일 것인지 말 것인지 결정하는 ui를 만든다. 

```react
function App() {  var [funcShow, setFuncShow] = useState(true);  return (    <div className="App">      <h1>Hello World!</h1>      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}      <ClassComp initNumber={2}></ClassComp>    </div>  );}
```

funcShow가 true이면 FuncComp를 보이고, false이면 보이지 않게 했다. 

```react
function App() {  var [funcShow, setFuncShow] = useState(true);  var [classShow, setClassShow] = useState(true);  return (    <div className="App">      <h1>Hello World!</h1>      <input           type="button"           value="remove func"          onClick={            function(){              setFuncShow(false)            }          }>      </input>      <input           type="button"           value="remove class"          onClick={            function(){              setClassShow(false)            }          }>      </input>      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}    </div>  );}
```

컴포넌트들을 보이지 않게 하는 버튼을 만들고, onClick으로 setFuncShow를 실행해서 state를 false로 변경하도록 구현한다. 