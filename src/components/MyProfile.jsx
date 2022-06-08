import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import MyExperience from "./MyExperience";

//This component is displays details of the  profile details of the user

const MyProfile = () => {
  const [profile, setProfile] = useState("");
  const [showImage, setShowImage] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [profileFormData, setProfileFormData] = useState({
    name: "",
    surname: "",
    email: "",
    bio: "",
    title: "",
    area: ""
  });

  useEffect(() => {
    profileData();
  }, []);
  //this is the function that fetches the profile details of the user
  const profileData = async () => {
    let response = await fetch(
      "http://localhost:3005/profile/62a0539ca1fd05dc5a8c887a"
    );

    let profileData = await response.json();
    //this is the state that handles the adding user profile details
    setProfile(profileData);
    //this is the state that handles the editing of the profile details
    setProfileFormData(profileData);
  };
  //this is the function that handles the editing of the profile details
  const editData = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "http://localhost:3005/profile/62a0539ca1fd05dc5a8c887a",
      {
        method: "PUT",
        body: JSON.stringify(profileFormData),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    console.log(response);
    setShow(false);
  };

  // this is the function that handles the upload of user image
  const uploadImage = async (e) => {
    e.preventDefault();
    //this is the state that handles the uploading of the image, the FormData method is used to handle image upload
    //and append the image to the form
    const data = new FormData();
    data.append("profile", showImage);
    try {
      let response = await fetch(
        "http://localhost:3005/profile/62a0539ca1fd05dc5a8c887a/image",
        {
          method: "POST",
          body: data,
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );

      if (response.ok) {
        alert("Image Uploaded Successfully");
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <Wrapper>
        <Header>
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <div className=" d-flex justify-content-end mt-3">
                  <BiPencil size="1.3rem" color="white" />
                </div>
              </Col>
            </Row>
          </Container>
        </Header>
        <AvatarLogo>
          <img
            className="jumbotron-img"
            src={profile.image}
            alt="avatar"
            onClick={handleShow2}
          />
        </AvatarLogo>
        <Body>
          <Container>
            <Row>
              <Col md={8}>
                <div className="jumbotron-body">
                  <h3>
                    {profile.name} {profile.surname}
                    <span className="text-muted ml-1">(Him/He)</span>
                  </h3>
                  <p>{profile.bio}</p>
                  <p>
                    <span className="text-muted"> {profile.area}</span>
                    <b>
                      <a href="asd#" target="_blank" className="ml-2">
                        {profile.username}
                      </a>
                    </b>
                  </p>

                  <p className="my-2">
                    <b>
                      <a href="asd#" target="_blank">
                        100 Connections
                      </a>
                    </b>
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className=" d-flex justify-content-end mb-3 text-muted">
                  <BiPencil size="1.5rem" onClick={handleShow} />
                </div>
              </Col>
            </Row>
            <ButtonsClick>
              <button className="jumbotron-btn mr-2  rounded-pill bg-primary text-white text-center px-4 py-2">
                Open to
              </button>
              <button className="jumbotron-btn  mr-2 rounded-pill bg-light border-primary text-primary text-center px-4">
                Add profile section
              </button>
              <button className="jumbotron-btn mr-2 rounded-pill text-center px-4">
                More
              </button>
            </ButtonsClick>
          </Container>
          <Container className="mt-3">
            <Row>
              <Col md={6} className="mb-3">
                <div className="jumbotron-footer-left">
                  <p>
                    <span className=" d-flex justify-content-end">
                      <BiPencil />
                    </span>
                    <strong> Lorem ipsum dolor</strong> sit amet consectetur
                    adipisicing elit.
                  </p>
                  <b>
                    <a href="asd#" target="_blank" className="">
                      See all details
                    </a>
                  </b>
                </div>
              </Col>

              <Col md={6}>
                <div className="jumbotron-footer-right">
                  <p>
                    <span className=" d-flex justify-content-end">
                      <IoClose />
                    </span>
                    <strong> Lorem ipsum dolor</strong> sit amet consectetur
                    adipisicing elit.
                  </p>
                  <b className="mt-2">
                    <a href="asd#" target="_blank" className="">
                      Get started
                    </a>
                  </b>
                </div>
              </Col>
            </Row>
          </Container>
        </Body>
      </Wrapper>
      {/* This is the experience component that appears below the profile details */}
      <MyExperience />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* this is the modal that allows user to edit post */}
        <Modal.Header closeButton>
          <Modal.Title>Edit intro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editData}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={profileFormData.name}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    name: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Surname:</Form.Label>
              <Form.Control
                type="text"
                value={profileFormData.surname}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    surname: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={profileFormData.email}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    email: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio:</Form.Label>
              <Form.Control
                type="text"
                value={profileFormData.bio}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    bio: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={profileFormData.title}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    title: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Area:</Form.Label>
              <Form.Control
                type="text"
                value={profileFormData.area}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    area: e.target.value
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={uploadImage}>
              <input
                type="file"
                onChange={(e) => setShowImage(e.target.files[0])}
              />
              <Button
                variant="primary"
                onClick={handleClose2}
                type="submit"
                className="float-right"
              >
                Post Image
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
};

export default MyProfile;

const Wrapper = styled.div`
  position: relative;
  min-height: 65vh;
  background-color: rgb(255, 255, 255);
  border: 0.1px solid #e0dfdc;
  border-radius: 15px;
  overflow: hidden;
`;

const Header = styled.div`
  min-height: 10rem;
  background-color: blue;
  background-image: url("https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29yayUyMHN0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60");
  background-size: cover;
  border-radius: 10px 10px 0px 0px;
`;

const Body = styled.div`
  background-color: white;
  margin-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
`;

const AvatarLogo = styled.div`
  position: absolute;
  width: 142px;
  height: 142px;
  border-radius: 50%;
  margin-top: -6rem;
  margin-left: 1.5rem;
  overflow: hidden;
`;

const ButtonsClick = styled.div`
  display: inline-flex;
  margin-right: 4.5rem;
`;
