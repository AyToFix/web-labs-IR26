import React, { useState } from 'react';
import './ProductTile.css';

const additionalContent = [
  {
    id: 1,
    imgSrc: "/dodo.png",
    heading: "Top-notch Printing Quality",
    paragraph: "Our printers offer unparalleled printing quality with sharp texts and vibrant colors. Perfect for both professional and personal use."
  }
];

export const ProductTiles = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="product-tiles">
      <div className="tile">
        <img className="printer-pr1" src="/pr2.png" alt="PrinterE" />
        <h3>Exclusive#1</h3>
        <p>High-quality printer with excellent print speed.</p>
      </div>
      <div className="tile">
        <img className="printer-pr2" src="/pr3.jpg" alt="PrinterE" />
        <h4>Exclusive#2</h4>
        <p>Compact and efficient for small offices.</p>
      </div>
      <div className="tile">
        <img className="printer-pr3" src="/pr4.jpg" alt="PrinterE" />
        <h5>Exclusive#3</h5>
        <p>Best value for home and office use.</p>
      </div>
      {!showMore && <button onClick={() => setShowMore(true)}>View more</button>}

      {showMore && additionalContent.map(content => (
        <div key={content.id} className="additional-content">
          <img src={content.imgSrc} alt={content.heading} />
          <h3>{content.heading}</h3>
          <p>{content.paragraph}</p>
        </div>
      ))}
    </section>
  );
};
