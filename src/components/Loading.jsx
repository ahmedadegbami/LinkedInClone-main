import { Spinner } from "react-bootstrap"
//This is the loading spinner that is used in the NewsFeed component to show that the data is loading
const Loading = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <Spinner animation="border" variant="dark" />
      </div>
    </div>
  )
}

export default Loading
