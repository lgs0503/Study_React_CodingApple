
import { useState } from "react";
import "./App.css";

const App = () => {

  const [post, setPost] = useState([
    {
    idx:1,
    title:"다은이의 첫글",
    content:"이야 기분좋다",
    user:"lgs0503",
    date:"2022-06-19"
    },
    {
    idx:2,
    title:"광석 첫글",
    content:"이야 기분싫다",
    user:"ekrjs189",
    date:"2022-06-20"
    },
    {
    idx:3,
    title:"다은이의 두번째글",
    content:"이야 기분좋다 가 말앗다",
    user:"lgs0503",
    date:"2022-06-21"
    }
  ]);

  const [postDetail, setPostDetail] = useState({
    idx: null,
    title:null,
    content:null,
    user:null,
    date:null
  });

  const [modalClose, setModalClose] = useState("hidden");

  const [modalState, setModalState] = useState(false);

  const handlePostClick = (index) => {
    setPostDetail(post[index]);
    setModalClose("show");
    setModalState(false);
  }
  
  const handleAddClick = () => {
    setModalClose("show");
    setModalState(true);
  }

  return (
    <>
    <div>
      <Header></Header>
      <div className="btnForm">
        <button onClick={() => handleAddClick()}>추가</button>
      </div>
      {
        post.map((value, index) => (
          <Post
            key={index} 
            post={post[index]} 
            handlePostClick={() => handlePostClick(index)} 
          ></Post>
        ))
      }
    </div>
    <Modal 
        postDetail={postDetail}
        modalClose={modalClose}
        setModalClose={setModalClose}
        modalState={modalState}
        setPost={setPost}
        post={post}
      />
    </>
  );
}

const Post = (props) => {
  
  const [postCnt, setPostCnt] = useState(0);

  const postCntUp = (e) =>{
    e.stopPropagation();
    setPostCnt(postCnt + 1);
  }

  return (
    <div className="post">
      <div className="postTilte" onClick={() => props.handlePostClick()}>
        {props.post.title}
        <span>
          {postCnt}<button onClick={(e) => postCntUp(e)}>좋아요</button>
        </span>
      </div>
      <div className="postInfo">
        <div>{props.post.user}</div>
        <div>{props.post.date}</div>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div className="headerStyle">
      Board
    </div>
  )
}

const Modal = (props) => {

  const [newItem, setNewItem] = useState({
    idx: null,
    title: null,
    content: null,
    user: null,
    date: null
  });

  const handleCange = (e, name) => {
    setNewItem((prevState) => ({
      ...prevState,
      [name] : e.target.value
    }));
  }

  const handleSaveClick = () => {
    props.setPost([newItem, ...props.post]);

    props.setModalClose("hidden");
  }

  return(
    <div className={`modal ${props.modalClose}`}>
      <div className={`postDetail`}>
        <div className="postTilte">
          {
            props.modalState === false 
            ?
            props.postDetail.title
            : 
            (
              <input id="title" type="text" placeholder="제목" onChange={(e) => handleCange(e, "title") }></input>
            )
          }
          <span onClick={()=> props.setModalClose("hidden")}>X</span>
        </div>
        <div className="postContent">
          {
            props.modalState === false 
            ?
            props.postDetail.content
            : 
            (
              <input id="content" type="text" placeholder="내용" onChange={(e) => handleCange(e, "content")} ></input>
            )
          }
        </div>
        <div className="postInfo">
          {
            props.modalState === false 
            ?
            (
              <>
                <div>{props.postDetail.user}</div>
                <div>{props.postDetail.date}</div>
              </>
            )
            : 
            (
              <>
                <div><input id="user" type="text" placeholder="유저" onChange={(e) => handleCange(e, "user")}></input></div>
                <div><input id="date" type="date" placeholder="날짜" onChange={(e) => handleCange(e, "date")}></input></div>
              </>
            )
          }
        </div>
        {
          props.modalState === false 
          ?
          null
          : (
            <div className="btnForm">
            <button onClick={() => handleSaveClick()}>저장</button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
