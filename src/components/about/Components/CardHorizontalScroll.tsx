import React, { useEffect, useRef } from "react";

const CardHorizontalScroll: React.FC = () => {
  const horizontalSectionRef = useRef<HTMLElement>(null);
  const horizontalListRef = useRef<HTMLDivElement>(null);
  let translationX = 0;

  const getOffsetTop = (element: HTMLElement) => {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
    return offsetTop;
  };

  const handleHorizontalScroll = () => {
    const horizontalSection = horizontalSectionRef.current;
    const horizontalList = horizontalListRef.current;
    if (horizontalSection && horizontalList) {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalOffsetTop = getOffsetTop(horizontalSection);
      const totalOffsetBottom = totalOffsetTop + horizontalSection.offsetHeight;
      const horizontalListSectionRectWidth = horizontalList.getBoundingClientRect().width;

      // Calculate where the last card should align with the top of the next section
      const nextSectionOffsetTop = totalOffsetBottom; // Adjust this according to your layout

      // Calculate the maximum translationX to ensure the last card aligns with next section top
      const maxTranslationX = horizontalListSectionRectWidth - horizontalSection.offsetWidth;

      if (currentScrollTop > totalOffsetTop && currentScrollTop < nextSectionOffsetTop) {
        translationX =
          ((currentScrollTop - totalOffsetTop) / (nextSectionOffsetTop - totalOffsetTop)) *
          maxTranslationX *
          -1;
        horizontalList.style.transform = `translateX(${translationX}px)`;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHorizontalScroll);
    return () => {
      window.removeEventListener("scroll", handleHorizontalScroll);
    };
  }, []);

  return (
    <section ref={horizontalSectionRef} module-name="horizontal-section">
      <div className="horizontal">
        <div className="horizontal-container sticky">
          <div className="horizontal-list" ref={horizontalListRef}>
            <div className="horizontal-item ">
              <div className="cards-item">
                <div className="card-item-desc-container">
                  <div className="card-item-title">Music</div>
                  <div className="description">
                    <div className="card-item-desc">We build mobile and web-based apps,</div>
                    <div className="card-item-desc">platforms, and infrastructure fitted to your</div>
                    <div className="card-item-desc">needs. We have an open solutions</div>
                    <div className="card-item-desc">framework, so we work to fit your business,</div>
                    <div className="card-item-desc">not the other way around.</div>
                  </div>
                </div>
                <div className="card-image">
                  <img src="assets/Group 1000004205.png" alt="" />
                </div>
              </div>
            </div>
            <div className="horizontal-item">
              <div className="horizontal-content">
                <div className="cards-item">
                  <div className="card-item-desc-container">
                    <div className="card-item-title">Music</div>
                    <div className="description">
                      <div className="card-item-desc">We build mobile and web-based apps,</div>
                      <div className="card-item-desc">platforms, and infrastructure fitted to your</div>
                      <div className="card-item-desc">needs. We have an open solutions</div>
                      <div className="card-item-desc">framework, so we work to fit your business,</div>
                      <div className="card-item-desc">not the other way around.</div>
                    </div>
                  </div>
                  <div className="card-image">
                    <img src="assets/Group 1000004205.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="horizontal-item">
              <div className="cards-item">
                <div className="card-item-desc-container">
                  <div className="card-item-title">Music</div>
                  <div className="description">
                    <div className="card-item-desc">We build mobile and web-based apps,</div>
                    <div className="card-item-desc">platforms, and infrastructure fitted to your</div>
                    <div className="card-item-desc">needs. We have an open solutions</div>
                    <div className="card-item-desc">framework, so we work to fit your business,</div>
                    <div className="card-item-desc">not the other way around.</div>
                  </div>
                </div>
                <div className="card-image">
                  <img src="assets/Group 1000004205.png" alt="" />
                </div>
              </div>
            </div>
            <div className="horizontal-item">
              <div className="horizontal-content">
                <div className="cards-item">
                  <div className="card-item-desc-container">
                    <div className="card-item-title">Music</div>
                    <div className="description">
                      <div className="card-item-desc">We build mobile and web-based apps,</div>
                      <div className="card-item-desc">platforms, and infrastructure fitted to your</div>
                      <div className="card-item-desc">needs. We have an open solutions</div>
                      <div className="card-item-desc">framework, so we work to fit your business,</div>
                      <div className="card-item-desc">not the other way around.</div>
                    </div>
                  </div>
                  <div className="card-image">
                    <img src="assets/Group 1000004205.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardHorizontalScroll;
