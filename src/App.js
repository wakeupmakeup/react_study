import logo from './logo.svg';  // logo.svg 파일을 import합니다. 해당 파일은 React 앱의 로고로 사용될 수 있습니다. 하지만 이 코드에서는 실제로 사용되지 않는 것으로 보입니다.
import './App.css';  // App.css 스타일시트를 import합니다. 이 파일에는 이 앱에서 사용되는 CSS 스타일이 정의되어 있습니다.
import { useState } from 'react'; // React의 Hook인 useState를 import합니다. useState는 함수형 컴포넌트에서 상태를 관리하는 데 사용됩니다.

// Header라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 웹 페이지의 헤더 부분을 렌더링하는 역할을 합니다.
function Header(props) {
  // a 태그를 클릭했을 때의 기본 동작인 페이지 이동을 막고, props로 받은 onChangeMode 함수를 호출합니다. 
  // 이 함수를 통해 App 컴포넌트의 mode 상태가 변경됩니다.
  return <header>
    <h1><a href="/" onClick={function (event) {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

// Nav라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 네비게이션 메뉴를 렌더링하는 역할을 합니다.
function Nav(props) {
  const list = [
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]

  // props로 받은 topics 배열을 순회하면서 각 항목에 대한 리스트 아이템을 생성합니다. 
  // 각 리스트 아이템은 a 태그를 포함하고 있으며, a 태그를 클릭하면 기본 동작인 페이지 이동을 막고 
  // props로 받은 onChangeMode 함수를 호출하여 App 컴포넌트의 mode와 id 상태를 변경합니다.
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

// Article이라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 선택된 항목의 내용을 표시하는 역할을 합니다. 
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

// Create라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 새로운 항목을 생성하는 폼을 렌더링합니다.
function Create(props) {

  // 폼을 제출하면 기본 동작인 페이지 리로드를 막고, 입력 필드에서 값을 가져와서 props로 받은 onCreate 함수를 호출합니다.
  // 이 함수를 통해 App 컴포넌트의 topics 상태가 변경됩니다.
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} /></p>
      <p><textarea name="body" placeholder='body' value={body}></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props) {
  // props로 들어온 데이터를 state로 환승했다.
  const [title, setTitle] = useState(props, title);
  const [body, setBody] = useState(props, body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title' onChange={event => {
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name="body" placeholder='body' onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}


// App이라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 전체 앱의 상태를 관리하고, 다른 컴포넌트들을 조합하여 전체 앱을 렌더링합니다. 
function App() {
  // useState를 사용하여 앱의 현재 모드, 선택된 항목의 ID, 다음에 생성될 항목의 ID, 그리고 현재의 모든 항목을 저장하고 있는 topics를 상태로 관리합니다.
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' }
  ])

  let content = null;
  let contextControl = null;

  // mode의 값에 따라서 content를 결정합니다.
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
    contextControl = <li><a href={"/update/" + id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE'); // mode 가 update일 경우 뜨게 하면 된다. 
    }}>Update</a></li>
    // mode => read 인 경우에만 이게 뜨게 만든다. 
    // id를 저렇게 추가해서 형식을 지켜주자.

  }

  else if (mode === 'CREATE') {
    // mode가 'CREATE'일 때, Create 컴포넌트를 렌더링합니다.
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics([...topics, newTopic]);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics]
      const updatedTopic = { id: id, title: title, body: body } // 수정된 토픽 만들기
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
    }}></Update>
  }

  // App 컴포넌트의 렌더링 결과입니다. Header, Nav, content, 그리고 'Create' 링크를 렌더링합니다.
  return (
    <div>
      <Header title="Web" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}

      </ul>
    </div>
    // update 기능은 상세 페이지에 들어가야 보여지는게 세련되어 보인다. 
    // 그럼 어떻게 할까? 
    // 위에 read모드 함수를 보면 답이 있다. -> 사용자가 홈으로 갔을때는 안보이다가
    // read모드로 가는 순간 보이게 했다. 
  );
}

// App 컴포넌트를 export합니다. 다른 파일에서 이 컴포넌트를 import하여 사용할 수 있습니다.
export default App;
