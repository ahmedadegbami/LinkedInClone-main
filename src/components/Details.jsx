import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MySideBar from "./MySideBar";
import DetailsExperience from "./DetailsExperience";

//This component is displays details of the  profile the user clicks on

const Details = () => {
  const [profile, setProfile] = useState("");
  const params = useParams();
  // console.log("parmssss", params.username);
  // console.log("iddddd", params.id);

  useEffect(() => {
    profileData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username]);

  const profileData = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/profile/" +
        params.username
    );
    let profileData = await response.json();

    setProfile(profileData);
  };

  return (
    <>
      <Container>
        <Row className="my-3">
          <Col md={8}>
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
                />
              </AvatarLogo>
              <Body>
                <Container>
                  <Row>
                    <Col md={8}>
                      <div className="jumbotron-body">
                        <h3>{profile.name}</h3>
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
                    <Col md={4}>{/* <h6>{profile.bio}</h6> */}</Col>
                  </Row>
                  <ButtonsClick className="mb-3">
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
              </Body>
            </Wrapper>
            <DetailsExperience />
          </Col>
          <Col md={4}>
            <MySideBar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;

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
