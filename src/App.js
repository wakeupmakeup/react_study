/*6. 이벤트
이벤트 기능을 넣는 방법을 알아본다. 

*/


import logo from './logo.svg';
import './App.css';

function Header(props) {
  return <header>
    {/* 그리고 이곳에다가 온클릭이라는 이벤트를 걸어준다. 
    또 리엑트 html은 유사 html이다. 즉, 여기서 작성한 코드들을
    html로 컨버팅한다.
    
    이렇게 함수를 사용해서 밑에 헤더를 클릭했을때 밑과 같은 함수를 실행시키게 한다.
    파라미터 이름은 알아보기 쉽게 이벤트로 한다.
    또 기본동작을 방지하는 메서드를 사용해서 클릭해도 새로고침이 일어나지 않도록 한다. 
    */}
    <h1><a href="/" onClick={function (event) {
      event.preventDefault();

      props.onChangeMode();
      {/*
      윗 코드는 아래 함수인
    onChangeMode={function () {
        alert("this is header");
      }}
      을 호출하는 기능을 한다.
    */}

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
      {/* onChangeMode */}
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(event.target.id);

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
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' }
  ]
  return (
    <div>
      {/*이 헤더를 클릭했을때 안에 함수를 작동키게 하는 방법이다.
      그리고 함수를 설정해서 작동하게 하고 싶은 기능을 넣으면 된다.*/}
      <Header title="Web" onChangeMode={() => {
        alert("this is header");
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}
export default App;