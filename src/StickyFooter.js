import React from 'react';

const StickyFooter = () => {
  return (
    <div className="sticky-footer">
      <div className="designer-profile">
        <img src="path_to_designer_photo" alt="Designer" />
        <p>Specialty: Websites</p>
        <a href="designer_portfolio_url">View Portfolio</a>
      </div>
      <div className="designer-profile">
        <img src="path_to_designer_photo" alt="Designer" />
        <p>Specialty: Apps</p>
        <a href="designer_portfolio_url">View Portfolio</a>
      </div>
      <div className="designer-profile">
        <img src="path_to_designer_photo" alt="Designer" />
        <p>Specialty: Photography</p>
        <a href="designer_portfolio_url">View Portfolio</a>
      </div>
    </div>
  );
};

export default StickyFooter;
