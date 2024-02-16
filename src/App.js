import logo from './logo.svg';
import './App.css';
// 이 파일은 위에 보이는 app.css에서 온다.

// 사용자 정의 태그를 만들고 싶다면 이렇게 함수를 정의하면 된다.
// 밑에 태그 이름과 똑같은 이름으로 만들되 리엑트에서는 대문자로 해야함.
// 사실 이 개념은 사용자 정의 태그라는 말을 사용하지 않고 
// 컴포넌트라는 말을 사용한다. 
function Header() {
  return <header>
    <h1><a href="/">react</a></h1>
  </header>
  // 그리고 이 함수는 헤더 태그 값을 리턴하게 하면 된다. 
}

function Nav() {
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">js</a></li>
    </ol>
  </nav>
}

function Article() {
  return <article>
    <h2>welcome</h2>
    hello, web
  </article>
}

function App() {
  return (
    <div>
      {/* 홈으로 이동하는 헤더 영역 */}
      {/* 만약 각 구간에 1억줄의 코드가 있다면
      당연히 보기 어려울 것임 그래서 이걸 처리하는 방법을 알려주겠다. 
      
      
      정리 정돈의 핵심은 서로 연관된 것들을 모으는 것이다.
      그리고 모은 것들에 이름을 붙인다.
      -> 이를 그룹핑이라 함
      
      여기선 하나의 태그로 이름을 붙인다는 것. 
      -> 그리고 이것을 사용자 정의 태그로 만든다.*/}

      {/*<header>
        <h1><a href="/">WEB</a></h1>
        라는 값이 원래 여기에 있었다.
        </header>*/}

      {/* 또 윗 함수를 사용하는 방법은 아래와 같다. 그냥 이렇게 하면 됨 */}
      <Header></Header>

      {/* 구체적인 글을 보는 홈페이지로 가는 영역 */}
      {/*<nav>
        <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>
      </nav>*/}
      <Nav></Nav>

      {/*<article>
        <h2>welcome</h2>
        hello, web
    </article>*/}
      <Article></Article>
    </div>
  );
}


export default App;
