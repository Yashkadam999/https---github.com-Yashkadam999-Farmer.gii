import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PhotoCard() {
  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ width: '18rem' }}>
        <img
          src="https://via.placeholder.com/300x200"
          className="card-img-top"
          alt="Profile"
        />
        <div className="card-body text-center">
          <h5 className="card-title">Yash Kadam</h5>
          <h6 className="card-subtitle mb-2 text-muted">Software Developer</h6>
          <p className="card-text">
            Passionate about building full-stack applications and learning new technologies.
          </p>
          <a href="#" className="btn btn-primary">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
