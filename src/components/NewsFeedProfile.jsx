import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import styled from "styled-components";
// this is the component that displays the user profile on the news feed page
const NewsFeedProfile = () => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    profileData();
  }, []);
  const profileData = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/profile/ahmed141",
      {
        // headers: {
        //   Authorization:
        //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4"
        // }
      }
    );
    let profileData = await response.json();
    if (response.ok) {
      console.log("ahmed", profileData);
    }
    setProfile(profileData);
  };

  console.log("profile", profile);
  console.log("profileimage", profile.image);
  return (
    <>
      <Wrapper>
        <Header></Header>
        <AvatarLogo>
          <img
            className="jumbotron-img h-100 "
            src={profile.image}
            alt="avatar"
          />
        </AvatarLogo>
        <Body>
          <Container>
            <Row className="justify-content-center">
              <Col>
                <div className="jumbotron-body">
                  <Link to="/" className="text-dark text-center">
                    <h5 className="my-2">
                      {profile.name} {profile.surname}
                    </h5>
                  </Link>

                  <p className="my-2 text-muted text-center">{profile.bio}</p>
                </div>
                <hr />
                <p style={{ fontSize: "12px" }} className="text-muted">
                  People who viewed your profile{" "}
                  <span className="float-right text-primary">26</span>
                </p>
                <p style={{ fontSize: "12px" }} className="text-muted mb-2">
                  Impressions of your post{" "}
                  <span className="float-right text-primary">69</span>
                </p>
                <hr />
                <p style={{ fontSize: "12px" }} className="text-muted m-0">
                  Access to exclusive tools and insights{" "}
                </p>

                <BsStarFill className="text-warning mr-1" size="" />
                <span className="text-muted" style={{ fontSize: "14px" }}>
                  Reactivate Premium
                </span>
                <hr />
                <i className="bi bi-bookmark-fill mr-1"></i>
                <span className="text-muted" style={{ fontSize: "14px" }}>
                  My Items
                </span>
                <hr />
              </Col>
            </Row>
          </Container>
        </Body>
      </Wrapper>

      <Section className="sticky-top">
        <Container>
          <Row>
            <Col>
              <h5 className="text-primary my-2">Recent</h5>
              <ul
                className="list-unstyled text-muted"
                style={{ fontSize: "12px" }}
              >
                <li>#JavaScript</li>
                <li>#React</li>
                <li>#Node.js</li>
                <li>#Express.js</li>
                <li>#MongoDB</li>
                <li>#Mongoose</li>
                <li>#Bootstrap</li>
                <li>#HTML</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};

export default NewsFeedProfile;
const Wrapper = styled.div`
  position: relative;
  ${"" /* min-height: 65vh; */}
  background-color: rgb(255, 255, 255);
  border: 0.1px solid #e0dfdc;
  border-radius: 15px;
  overflow: hidden;
`;

const Header = styled.div`
  min-height: 5rem;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Section = styled.div`
  background-color: rgb(255, 255, 255);
  border: 0.1px solid #e0dfdc;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 10px;
`;
