import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//This is the component that appears on the side bar and also displays the details of the available users,
//it is also used to display the details of the user that the user clicks on
const MySideBar = () => {
  const [profiles, setProfiles] = useState([]);
  const [showmore, setShowmore] = useState(5);
  const [showmore1, setShowmore1] = useState(5);
  const [isShowing, setIsShowing] = useState(false);

  const showMoreHandler = () => {
    setShowmore(showmore + 5);
    setIsShowing(true);
  };

  const showLessHandler = () => {
    setShowmore(5);
    setIsShowing(false);
  };

  const showMoreHandler1 = () => {
    setShowmore1(showmore1 + 5);
    setIsShowing(true);
  };

  const showLessHandler1 = () => {
    setShowmore1(5);
    setIsShowing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch(
      "https://backend-linkedin-buildweek.herokuapp.com/profile/"
    );
    let responseData = await response.json();
    console.log(responseData);
    setProfiles(responseData);
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Body>
          <Card.Text className="font-weight-bold" style={{ fontSize: "14px" }}>
            Edit public profile & URL{" "}
            <span className="float-right">
              <i className="bi bi-question-circle-fill"></i>
            </span>
          </Card.Text>
          <hr></hr>
          <Card.Text className="font-weight-bold" style={{ fontSize: "14px" }}>
            Add profile in another language{" "}
            <span className="float-right">
              <i className="bi bi-question-circle-fill"></i>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Body>
          <Card.Title className="font-weight-bold" style={{ fontSize: "16px" }}>
            People also viewed
          </Card.Title>
          {profiles.splice(1, showmore).map((profile) => (
            <Row key={profile._id}>
              <Col sm={3}>
                <Link to={"/details/" + profile.username}>
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
                  <Link to={"/details/" + profile.username}>
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
          <Row>
            <Col className="p-0">
              <hr></hr>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {/* show more */}
            <Col>
              {!isShowing && (
                <h6
                  className="text-center font-weight-bold m-0 text-muted"
                  onClick={showMoreHandler}
                >
                  {" "}
                  Show more <i className="bi bi-chevron-compact-down"></i>
                </h6>
              )}
              {isShowing && (
                <h6
                  className="text-center font-weight-bold m-0 text-muted"
                  onClick={showLessHandler}
                >
                  {" "}
                  Show Less <i className="bi bi-chevron-compact-down"></i>
                </h6>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* people you may know starts here */}

      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Body>
          <Card.Title className="font-weight-bold" style={{ fontSize: "16px" }}>
            People you may know
          </Card.Title>
          {profiles.splice(0, showmore1).map((profile) => (
            <Row key={profile._id}>
              <Col sm={3}>
                <Link to={"/details/" + profile.username}>
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
                  <Link to={"/details/" + profile.username}>
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
          <Row>
            <Col className="p-0">
              <hr></hr>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {/* show more */}
            <Col>
              {!isShowing && (
                <h6
                  className="text-center font-weight-bold m-0 text-muted"
                  onClick={showMoreHandler1}
                >
                  {" "}
                  Show more <i className="bi bi-chevron-compact-down"></i>
                </h6>
              )}
              {isShowing && (
                <h6
                  className="text-center font-weight-bold m-0 text-muted"
                  onClick={showLessHandler1}
                >
                  {" "}
                  Show Less <i className="bi bi-chevron-compact-down"></i>
                </h6>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MySideBar;
