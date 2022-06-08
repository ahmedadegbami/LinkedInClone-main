import { Card, Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import SingleExperience from "./SingleExperience";

//This component is displays the user experience details, the user can add new experience details,
// the user can edit and delete the experience details, the user can also add new experience image

const MyExperience = () => {
  const [experiences, setExperiences] = useState([]);

  const [addExperience, setAddExperience] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: ""
  });

  useEffect(() => {
    fetchExperience();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // this is the function that fetches user experience
  const fetchExperience = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/626fd65617c4e00015d7a083/experiences",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4"
        }
      }
    );
    let responseData = await response.json();
    console.log(responseData);
    setExperiences(responseData);
  };
  // this is the function that handles the adding user experience
  const submitExperience = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/626fd65617c4e00015d7a083/experiences",
        {
          method: "POST",
          body: JSON.stringify({ ...addExperience }),
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4",
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response);
      if (response.ok) {
        console.log(response);
        alert("ok");
        setAddExperience({
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          area: ""
        });
      } else {
        alert("error");
      }
    } catch (error) {
      alert("error", error);
    }
  };

  return (
    <>
      <Wrapper className="my-2">
        <div className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between my-2">
              <Card.Title
                className="font-weight-bold"
                style={{ fontSize: "16px" }}
              >
                Experience
              </Card.Title>
              <div>
                <BiPlus size="1.5rem" onClick={handleShow} />
              </div>
            </div>
            {experiences.map((experience) => (
              <div key={experience._id}>
                <SingleExperience experience={experience} />
              </div>
            ))}
          </Card.Body>
        </div>
      </Wrapper>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitExperience}>
            <Form.Group>
              <Form.Label>Role* </Form.Label>
              <Form.Control
                type="text"
                value={addExperience.role}
                onChange={(e) =>
                  setAddExperience({ ...addExperience, role: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company*</Form.Label>
              <Form.Control
                type="text"
                value={addExperience.company}
                onChange={(e) =>
                  setAddExperience({
                    ...addExperience,
                    company: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date*</Form.Label>
              <Form.Control
                type="date"
                value={addExperience.startDate}
                onChange={(e) =>
                  setAddExperience({
                    ...addExperience,
                    startDate: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date*</Form.Label>
              <Form.Control
                type="date"
                value={addExperience.endDate}
                onChange={(e) =>
                  setAddExperience({
                    ...addExperience,
                    endDate: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Area*</Form.Label>
              <Form.Control
                type="text"
                value={addExperience.area}
                onChange={(e) =>
                  setAddExperience({ ...addExperience, area: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description*</Form.Label>
              <Form.Control
                type="text"
                value={addExperience.description}
                onChange={(e) =>
                  setAddExperience({
                    ...addExperience,
                    description: e.target.value
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
    </>
  );
};

export default MyExperience;
const Wrapper = styled.div`
  position: relative;
  background-color: rgb(255, 255, 255);
  border: 0.1px solid #e0dfdc;
  border-radius: 15px;
  overflow: hidden;
`;
