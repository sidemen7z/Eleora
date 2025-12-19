import React from 'react';

const About: React.FC = () => {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">About Eleora Food Company</h1>
          <p className="page-subtitle">Preserving Tradition, One Spice at a Time</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-section">
              <h2>Our Story</h2>
              <p>
                Eleora Food Company was born from a deep love for authentic Maharashtrian cuisine and a desire
                to preserve traditional recipes that have been passed down through generations. What started as
                a small kitchen operation has grown into a trusted name for homemade masalas and chutneys.
              </p>
              <p>
                Every product we create carries the essence of Maharashtra's rich culinary heritage. We believe
                that the best flavors come from patience, quality ingredients, and time-honored techniques that
                cannot be rushed or replicated by machines.
              </p>
            </div>

            <div className="about-section">
              <h2>Homemade Production Method</h2>
              <p>
                At Eleora, we take pride in our artisanal approach to spice blending. Each batch is carefully
                crafted in small quantities to ensure maximum freshness and flavor. Our spices are
                hand-selected, roasted to perfection, and blended using traditional methods that preserve their
                natural oils and aromas.
              </p>
            </div>

            <div className="about-section">
              <h2>Traditional Recipes</h2>
              <p>
                Our recipes are not just formulas—they are treasured family secrets that have been refined over
                decades. Each masala and chutney is crafted following traditional Maharashtrian methods,
                ensuring that every spoonful delivers an authentic taste of home.
              </p>
            </div>

            <div className="about-section">
              <h2>Quality Checking</h2>
              <p>
                Quality is at the heart of everything we do. Every batch undergoes rigorous quality checks at
                multiple stages of production. We personally taste and test each blend to ensure it meets our
                exacting standards before it reaches your kitchen.
              </p>
            </div>

            <div className="about-section">
              <h2>Purity and Consistency Promise</h2>
              <p>
                We promise you products that are 100% pure, with no artificial colors, preservatives, or
                fillers. What you see on the ingredient list is exactly what goes into our products—nothing
                more, nothing less.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
