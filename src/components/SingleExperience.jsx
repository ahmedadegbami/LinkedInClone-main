import { Row, Image, Col, Modal, Form, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

// this component displays a single experience

const SingleExperience = ({ experience }) => {
  const params = useParams();
  // console.log("parrams", params.id);

  const [formData, setFormData] = useState(experience);

  const [showExpImage, setShowExpImage] = useState(null);

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  console.log("exp", experience._id);

  const editExperience = async (e, _id) => {
    console.log("here is ID", _id);
    e.preventDefault();
    try {
      let response = await fetch(
        "https://backend-linkedin-buildweek.herokuapp.com/experience/" +
          experience._id,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json"
          }
          /*     headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmYTk5NDJhMGU3YzAwMTUyYzQ4MWMiLCJpYXQiOjE2NTQ2MzA4MDUsImV4cCI6MTY1NTg0MDQwNX0.OVp2JLd0_Es7M18bEhhtQtak6V2R3zRVCRWNglktSw4",
            "Content-Type": "application/json",
          }, */
        }
      );
      window.location.reload();
      console.log("response", response);
      setShow(false);
    } catch (error) {
      alert("error", error);
    }
  };

  const addExpPicture = async (e, _id) => {
    console.log("here is ID", _id);
    e.preventDefault();
    const dataExp = new FormData();
    dataExp.append("image", showExpImage);
    try {
      let response = await fetch(
        "https://backend-linkedin-buildweek.herokuapp.com/profile/" +
          experience._id +
          "/image",
        {
          method: "POST",
          body: dataExp
          /* headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZmZDY1NjE3YzRlMDAwMTVkN2EwODMiLCJpYXQiOjE2NTE0OTY1MzUsImV4cCI6MTY1MjcwNjEzNX0.8KY63vz_cG51-fBlBKeyzC8NE1kgqbjKuVVMCqVTllA",
          }, */
        }
      );
      if (response.ok) {
        window.location.reload();
        alert("Image Uploaded Successfully");
      }
    } catch (error) {
      alert("error", error);
    }
  };

  const handleDelete = async () => {
    try {
      let response = await fetch(
        "https://backend-linkedin-buildweek.herokuapp.com/profile/ahmed141/experiences/" +
          experience._id,
        {
          method: "DELETE",
          body: JSON.stringify(formData),
          headers: {
            /*   Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZmZDY1NjE3YzRlMDAwMTVkN2EwODMiLCJpYXQiOjE2NTE0OTY1MzUsImV4cCI6MTY1MjcwNjEzNX0.8KY63vz_cG51-fBlBKeyzC8NE1kgqbjKuVVMCqVTllA",
            "Content-Type": "application/json", */
          }
        }
      );
      if (response.ok) {
        window.location.reload();
        alert("Deleted Succesfully");
      }
      // navigate(-1);
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <>
      <Row>
        <Col md={1}>
          <div>
            <Link to={""}>
              <Image
                src={experience.image}
                rounded
                alt="profile-picture"
                height="40 px"
                onClick={handleShow2}
              />
            </Link>
          </div>
        </Col>
        <Col md={10}>
          <h6
            className="font-weight-bold my-1"
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          >
            {experience.role}
          </h6>

          <p
            className="text-muted my-1"
            style={{ fontSize: "13px", lineHeight: "1.4" }}
          >
            {experience.company}
          </p>
          <p
            className="m-0 text-muted"
            style={{ fontSize: "13px", lineHeight: "1.4" }}
          >
            {format(parseISO(experience.startDate), "MMMM yyyy")} -{" "}
            {format(parseISO(experience.endDate), "MMMM yyyy")}
          </p>
          <span
            className="text-muted"
            style={{ fontSize: "13px", lineHeight: "1.4" }}
          >
            {experience.area}
          </span>
        </Col>

        <Col md={1}>
          <div className="">
            {!params.id && (
              <BiPencil
                size="1.1rem"
                color="black"
                onClick={() => setShow(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </Col>
      </Row>
      <div>
        <hr />
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editExperience}>
            <Form.Group>
              <Form.Label>Role* </Form.Label>
              <Form.Control
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company*</Form.Label>
              <Form.Control
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date*</Form.Label>
              <Form.Control
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date*</Form.Label>
              <Form.Control
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate: e.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Area*</Form.Label>
              <Form.Control
                type="text"
                value={formData.area}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    area: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description*</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
              />
            </Form.Group>

            <Button variant="danger" onClick={handleDelete}>
              <AiFillDelete />
            </Button>

            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addExpPicture}>
            <input
              type="file"
              onChange={(e) => setShowExpImage(e.target.files[0])}
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
  );
};

export default SingleExperience;
