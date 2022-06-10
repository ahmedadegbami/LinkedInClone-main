import styled from "styled-components";
import { FcStackOfPhotos, FcVideoCall } from "react-icons/fc";
import PostSection from "./PostSection";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "./Loading";

//this is the component that displays news feed posts, it allows the user to add new post,edit and delete the post
const NewsFeedPost = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sendPost, setSendPost] = useState({
    text: ""
  });

  const [profile, setProfile] = useState("");

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
    profileData();
  }, []);

  const profileData = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/profile/ahmed141"
    );

    let profileData = await response.json();
    //this is the state that handles the adding user profile details
    setProfile(profileData);
    //this is the state that handles the editing of the profile details
  };

  const getPost = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/posts"
    );
    let postData = await response.json();
    // console.log(postData)
    setPosts(postData);
    setIsLoading(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        "https://backend-linkedin-buildweek.herokuapp.com/posts",
        {
          method: "POST",
          body: JSON.stringify(sendPost),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.ok) {
        window.location.reload();
        let postData = await response.json();
        console.log(postData);
        alert("success");
        setShow(false);
        setSendPost({
          text: ""
        });
      } else {
        alert("error else");
      }
    } catch (error) {
      alert("error");
    }
  };

  const filterOutPost = posts.filter((post) => post.user !== null);

  return (
    <>
      <Wrapper>
        <Header>
          <img src={profile.image} alt="profile-avatar" />
          <Input type="text" placeholder="Start a post" onClick={handleShow} />
        </Header>
        <Footer>
          <Section>
            {/* Onclick to upload image */}
            <FcStackOfPhotos size="1.5rem" />
            <span className="ml-2">Photo</span>
          </Section>
          <Section>
            <FcVideoCall size="1.5rem" />
            <span className="ml-2">Video</span>
          </Section>
          <Section>
            <img
              src="https://img.icons8.com/color/48/000000/clock--v4.png"
              alt="event"
            />
            Event
          </Section>
          <Section>
            <img
              src="https://img.icons8.com/color/48/000000/scroll.png"
              alt="article"
            />
            Write article
          </Section>
        </Footer>
      </Wrapper>

      <hr />
      {isLoading && <Loading />}
      {filterOutPost
        .splice(-12)
        .reverse()

        .map((post) => (
          <div key={post._id}>
            <PostSection post={post} />
          </div>
        ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            className="font-weight-normal"
            style={{ fontSize: "20px" }}
          >
            Create a post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePost}>
            <textarea
              rows={4}
              className="w-100"
              placeholder="What do you want to talk about?"
              style={{ border: "none", borderRadius: "10px" }}
              value={sendPost.text}
              onChange={(e) => setSendPost({ sendPost, text: e.target.value })}
            />
            <Button variant="primary" onClick={handleClose} type="submit">
              POST
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsFeedPost;

const Wrapper = styled.div`
  padding: 1rem 1rem;
  min-height: 5rem;
  border-radius: 6px;
  border: 1px solid #e6e6e6;
  background-color: white;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  border-radius: 25px;
  border: 1px solid #adadad;
  padding: 0 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 100%;
  margin-top: 1rem;
`;

const Section = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
  padding: 0.7rem 0.5rem;
  border-radius: 4px;

  img {
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #dddddd;
  }
`;
