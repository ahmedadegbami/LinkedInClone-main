//This component displays the footer section of the application
const MyFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src="https://www.citypng.com/public/uploads/preview/hd-linkedin-official-logo-transparent-background-31623962207jz85kqlqot.png"
              height="34"
              alt="logo"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <ul className="list-unstyled text-muted">
              <li>About</li>
              <li>Community Guidelines</li>
              <li>Privacy & terms</li>
              <li>Sales solutions</li>
              <li>safety center</li>
            </ul>
          </div>
          <div className="col-md-2">
            <ul className="list-unstyled text-muted">
              <li>Accessibility</li>
              <li>Careers</li>
              <li>Ad Choices</li>
              <li>Mobile</li>
            </ul>
          </div>
          <div className="col-md-2">
            <ul className="list-unstyled text-muted">
              <li>Talent solutions</li>
              <li>Marketing Solutions</li>
              <li>Advertising</li>
              <li>Small Business</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled text-muted">
              <li>
                <i className="bi bi-question-circle-fill"></i>
                <span className="ml-2">Questions</span>
                <p className="ml-4" style={{ fontSize: "11px" }}>
                  Visit out help center
                </p>
              </li>
              <li>
                <i className="bi bi-gear-fill"></i>
                <span className="ml-2">Manage your Account & Privacy</span>
                <p className="ml-4" style={{ fontSize: "11px" }}>
                  Go to your settings
                </p>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <select
              aria-label="Default select example"
              className="btn-outline-secondary"
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                background: "#F3F2EF",
              }}
            >
              <option>English (English)</option>
              <option value="1">French</option>
              <option value="2">German</option>
              <option value="3">Spanish</option>
              <option value="3">Yoruba</option>
              <option value="3">Mandarin</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default MyFooter
