import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//this is the news feed extra component that appears on the news feed page
const NewsFeedExtra = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/profile/",
      {
        // headers: {
        //   Authorization:
        //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4"
        // }
      }
    );
    let responseData = await response.json();
    // console.log(responseData)
    setProfiles(responseData);
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Body>
          <Card.Title className="font-weight-bold" style={{ fontSize: "16px" }}>
            Add to your feed{" "}
            <i className="bi bi-info-square-fill float-right"></i>
          </Card.Title>
          {profiles.splice(24, 3).map((profile) => (
            <Row key={profile._id}>
              <Col sm={3}>
                <Link to={"/details/" + profile.username + "/" + profile._id}>
                  <Image
                    src={profile.image}
                    rounded
                    alt="profile-picture"
                    height="48px"
                  />
                </Link>
              </Col>
              <Col sm={9}>
                <div>
                  <Link to={"/details/" + profile.username + "/" + profile._id}>
                    <h6
                      className="font-weight-bold mb-0"
                      style={{ fontSize: "14px", lineHeight: "1.4" }}
                    >
                      {" "}
                      {profile.name}
                      <span className="text-muted font-weight-normal">
                        {" "}
                        <i className="bi bi-dot"></i> 2nd
                      </span>
                    </h6>
                    <h6
                      className="text-muted"
                      style={{ fontSize: "13px", lineHeight: "1.4" }}
                    >
                      {" "}
                      {profile.title}
                    </h6>
                  </Link>
                  <Button
                    style={{
                      borderRadius: "50px",
                      fontSize: "16px",
                      width: "100px"
                    }}
                    variant="outline-dark"
                    className="font-weight-bold mb-2 text-muted p-1"
                  >
                    Connect
                  </Button>
                </div>
              </Col>
            </Row>
          ))}

          <Row className="justify-content-center">
            {/* show more */}
            <Col>
              <h6
                className="font-weight-bold m-0 text-muted"
                style={{
                  fontSize: "14px"
                }}
              >
                {" "}
                View all recommendations <i className="bi bi-arrow-right"></i>
              </h6>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* people you may know starts here */}

      <Card style={{ width: "18rem" }} className="mb-3 sticky-top">
        <Card.Body>
          <Card.Title className="font-weight-bold" style={{ fontSize: "16px" }}>
            Promoted <i className="bi bi-three-dots float-right"></i>
          </Card.Title>

          <Row>
            <Col sm={3}>
              <Image
                src="https://www.honeypot.io/static/logo-bear.svg"
                rounded
                alt="profile-picture"
                height="50px"
              />
            </Col>
            <Col sm={8} className="p-0">
              <div>
                <h6
                  className="font-weight-bold mb-0"
                  style={{ fontSize: "14px", lineHeight: "1.4" }}
                >
                  {" "}
                  FullStack Jobs in Germany
                </h6>
                <h6
                  className="text-muted p-0 mx-n1"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  {" "}
                  Signup on Honeypot and let companies apply to you!
                </h6>
              </div>
            </Col>
            <Col sm={1} className="p-1 mx-n1">
              <i
                className="bi bi-chevron-compact-right p-0"
                style={{ fontSize: "2rem" }}
              ></i>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Image
                src="https://media-exp1.licdn.com/dms/image/C4D0BAQEFWO_s8a0FHQ/company-logo_200_200/0/1647618816994?e=2147483647&v=beta&t=hgwtIzbwPl5z4OGvOxQSn6QWkVk3C_GlW2lrqqbJkYA"
                rounded
                alt="profile-picture"
                height="50px"
              />
            </Col>
            <Col sm={8} className="p-0">
              <div>
                <h6
                  className="font-weight-bold mb-0"
                  style={{ fontSize: "14px", lineHeight: "1.4" }}
                >
                  {" "}
                  Fullstack Entwickler 🚨
                </h6>
                <h6
                  className="text-muted p-0 mx-n1"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  {" "}
                  🖥 Finde deinen nächsten Hamburg Tech-Job. Gehälter von €60k
                  bis €120k.
                </h6>
              </div>
            </Col>
            <Col sm={1} className="p-1 mx-n1">
              <i
                className="bi bi-chevron-compact-right p-0"
                style={{ fontSize: "2rem" }}
              ></i>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYpl6Xtyqrdny1jV5FnGBj0zvlqzjy6Bf7A&usqp=CAU"
                rounded
                alt="profile-picture"
                height="40px"
                width="50px"
              />
            </Col>
            <Col sm={8} className="p-0">
              <div>
                <h6
                  className="font-weight-bold mb-0"
                  style={{ fontSize: "14px", lineHeight: "1.4" }}
                >
                  {" "}
                  Power of SAP | 12. Mai
                </h6>
                <h6
                  className="text-muted p-0 mx-n1"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  {" "}
                  Die Web-Conference zur Automatisierung und Digitalisierung in
                  SAP
                </h6>
              </div>
            </Col>
            <Col sm={1} className="p-1 mx-n1">
              <i
                className="bi bi-chevron-compact-right p-0 "
                style={{ fontSize: "2rem" }}
              ></i>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewsFeedExtra;
