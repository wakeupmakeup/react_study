/*

7. state

prop처럼 새로운 return 값을 만들어 주는 데이터
이 둘다 이 값이 변경되면 새로운 리턴값이 된다

prop은 컴포넌트를 사용하는 외부자를 위한 데이터
state는 컴포넌트를 만드는 내부자를 위한 데이터임.

*/


import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// 이걸 임포트 시킨다. 

// 그리고 mode라는 지역 변수들을 이제 state로 업그레이드 시킬 것임.
// 업그레이드는 useState()를 사용하면 됨.

function Header(props) {
  return <header>

    <h1><a href="/" onClick={function (event) {
      event.preventDefault();

      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const list = [
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));

      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // const _mode = useState("WELCOME");
  // 이 값을 콘솔로 보면 0번째 값은 상태의 값을 읽을때 쓰는 데이터
  // 1번째 데이터는 그 상태의 값을 변경할때 사용하는 함수를 나타낸다.
  // 즉, const mode = _mode[0]; 이렇게 하면 mode의 값을 통해 상태의 값을 읽을 수 있음.
  // const setMode = _mode[1]; 이렇게 하면 setMode를 통해 mode의 값을 설정할 수 있다는 것이다. 
  // 위에 처럼 하면 복잡하니까 보통은 아래 처럼 사용한다. 

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' }
  ]

  let content = null;

  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ') {

    let title, body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    // 이렇게 하면 아무런 일이 일어나지 않는다.
    // 왜냐면 이렇게 디버깅을 하면 console.log(topics[i].id, id);
    // topics.id 값은 1,2,3에 숫자인데 id state값은 '2'라는 문자로 나와서 그렇다. 
    // 왜 문자로 나오냐면 그 이유는 아래와 같다. 

    // 먼저 id state 값은 setId에서 왔고
    // 또 setId는 아래 함수인 setId(_id)에서 사용된다. 
    // 여기 _id값은 Nav안에서 왔다. 
    // nav의 내부로 들어가보면 event.target.id을 통해서 id 값을 알아내는데 
    // 그 id 값은 {t.id}에 들어있다. 그리고 입력한 값은 숫자지만 태그의 속성으로 넘기면
    // 그것은 문자가 된다.
    // 따라서 문자가 된 데이터를 숫자로 바꿔주면 된다. 
    // 바꾸는 방법은 Number 함수를 사용하면 된다. 
  }
  return (
    <div>
      <Header title="Web" onChangeMode={() => {
        // mode = 'WELCOME';
        // 값을 바꿀때는 setMode를 사용하자.
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        // mode = 'READ';
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );

  {/* 여기서 mode 값을 다르게 줘도 아무런 반응이 일어나지 않는다. 
여기서 값을 바꾼들 위에 App()에서 리프레시가 나면서 UI가 변경되야 하는데 리프레시가 되지
않기 때문이다. 이를 위해 맨 위에다가 state 특성을 임포트 시킨다. */}
}
export default App;