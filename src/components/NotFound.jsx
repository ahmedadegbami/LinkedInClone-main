//this component is used to render the 404 page
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="not-found-content">
              <img
                src="https://png.pngtree.com/png-vector/20201224/ourlarge/pngtree-error-404-page-not-found-png-image_2598541.jpg"
                alt="notfound"
              />
              <div className="not-found-text text-center">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NotFound
