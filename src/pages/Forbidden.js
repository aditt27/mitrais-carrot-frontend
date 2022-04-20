export default function Forbidden() {
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">403</span>
            <div className="mb-4 lead">The page you are looking for was forbidden.</div>
            <a href="/" className="btn btn-link">Back to Home</a>
          </div>
        </div>
      </div>
  );
}