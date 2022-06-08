import { Container, Row, Col } from "react-bootstrap"
import NewsFeedExtra from "./NewsFeedExtra"
import NewsFeedPost from "./NewsFeedPost"
import NewsFeedProfile from "./NewsFeedProfile"
//this is the news feed component
const NewsFeed = () => {
  return (
    <>
      <Container className="my-3">
        <Row>
          <Col md={3}>
            <NewsFeedProfile />
          </Col>
          <Col md={6}>
            <NewsFeedPost />
          </Col>
          <Col md={3}>
            <NewsFeedExtra />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewsFeed
