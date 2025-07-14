import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

// Extended brands list with more motorcycle manufacturers
const brands = [
  { id: 1, name: "Honda", icon: "/brands/honda.png" },
  { id: 2, name: "Yamaha", icon: "/brands/yam.png" },
  { id: 3, name: "Suzuki", icon: "/brands/suzuki.png" },
  { id: 4, name: "GPX", icon: "/brands/gpx.png" },
  { id: 5, name: "Taro", icon: "/brands/taro.png" },
  { id: 6, name: "Walton", icon: "/brands/walton.png" },
  { id: 7, name: "Runner", icon: "/brands/runner.png" },
  { id: 8, name: "Kawasaki", icon: "/brands/kawa.png" },
  { id: 9, name: "KTM", icon: "/brands/ktm.png" },
  { id: 10, name: "Royal Enfield", icon: "/brands/royal.png" },
  { id: 11, name: "Aprilia", icon: "/brands/ap.png" },
  { id: 12, name: "Bajaj", icon: "/brands/bajaj.png" },
  { id: 13, name: "TVS", icon: "/brands/tvs.png" },
  { id: 14, name: "Hero", icon: "/brands/hero.png" },
  { id: 15, name: "Benelli", icon: "/brands/beni.png" },
  { id: 16, name: "CF Moto", icon: "/brands/cf.png" },
  { id: 17, name: "Ducati", icon: "/brands/du.png" },
  { id: 18, name: "Keeway", icon: "/brands/kee.png" },
  { id: 19, name: "Lifan", icon: "/brands/lifan.png" },
  { id: 20, name: "BMW", icon: "/brands/bmw.png" },
];

function BrandShowcase() {
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    if (!firstRow || !secondRow) return;

    const handleFirstRowScroll = () => {
      updateArrowVisibility(firstRow);
      // Sync second row scroll position with first row
      if (activeRow === "first") {
        secondRow.scrollLeft = firstRow.scrollLeft;
      }
    };

    const handleSecondRowScroll = () => {
      updateArrowVisibility(secondRow);
      // Sync first row scroll position with second row
      if (activeRow === "second") {
        firstRow.scrollLeft = secondRow.scrollLeft;
      }
    };

    const updateArrowVisibility = (container) => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    // Initialize arrow visibility
    updateArrowVisibility(firstRow);

    firstRow.addEventListener("scroll", handleFirstRowScroll);
    secondRow.addEventListener("scroll", handleSecondRowScroll);

    return () => {
      firstRow.removeEventListener("scroll", handleFirstRowScroll);
      secondRow.removeEventListener("scroll", handleSecondRowScroll);
    };
  }, [activeRow]);

  const scroll = (direction) => {
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    if (firstRow && secondRow) {
      const scrollAmount = firstRow.clientWidth * 0.8;
      const scrollValue = direction === "left" ? -scrollAmount : scrollAmount;

      firstRow.scrollBy({
        left: scrollValue,
        behavior: "smooth",
      });

      secondRow.scrollBy({
        left: scrollValue,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e, row) => {
    setActiveRow(row);
    setIsDragging(true);
    const container =
      row === "first" ? firstRowRef.current : secondRowRef.current;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveRow(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !activeRow) return;
    e.preventDefault();

    const container =
      activeRow === "first" ? firstRowRef.current : secondRowRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;

    container.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e, row) => {
    setActiveRow(row);
    setIsDragging(true);
    const container =
      row === "first" ? firstRowRef.current : secondRowRef.current;
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !activeRow) return;

    const container =
      activeRow === "first" ? firstRowRef.current : secondRowRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2;

    container.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-16 bg-[#EEF0FC]/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-black">Popular Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore motorcycles from the world's leading manufacturers
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows - Enhanced */}
          {showLeftArrow && (
            <button
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-md hover:shadow-lg hover:bg-[#EEF0FC]/80 transition-all duration-300"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          {/* Brands Container - Two rows setup */}
          <div className="overflow-hidden">
            {/* First row of brands */}
            <div
              ref={firstRowRef}
              className="grid grid-flow-col auto-cols-max gap-5 overflow-x-auto pb-5 scrollbar-hide snap-x"
              onMouseDown={(e) => handleMouseDown(e, "first")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => handleTouchStart(e, "first")}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleTouchMove}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {brands.slice(0, 10).map((brand) => (
                <motion.div
                  key={brand.id}
                  className="snap-start w-44 md:w-60 h-48 bg-gradient-to-b from-white to-[#EEF0FC]/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#EEF0FC]"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(66, 71, 200, 0.1)",
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Full-size image area */}
                    <div className="flex-1 flex items-center justify-center w-full p-4 overflow-hidden">
                      <img
                        src={brand.icon}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/200/EEF0FC/333333?text=${brand.name.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
                    {/* Refined text label with subtle styling */}
                    <div className="w-full py-3 text-center border-t border-[#EEF0FC]">
                      <h3 className="font-medium text-gray-800 text-base">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row of brands */}
            <div
              ref={secondRowRef}
              className="grid grid-flow-col auto-cols-max gap-5 overflow-x-auto mt-5 pb-5 scrollbar-hide snap-x"
              onMouseDown={(e) => handleMouseDown(e, "second")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => handleTouchStart(e, "second")}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleTouchMove}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {brands.slice(10).map((brand) => (
                <motion.div
                  key={brand.id}
                  className="snap-start w-44 md:w-60 h-48 bg-gradient-to-b from-white to-[#EEF0FC]/40 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#EEF0FC]"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(66, 71, 200, 0.1)",
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Full-size image area */}
                    <div className="flex-1 flex items-center justify-center w-full p-4 overflow-hidden">
                      <img
                        src={brand.icon}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/200/EEF0FC/333333?text=${brand.name.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
                    {/* Refined text label with subtle styling */}
                    <div className="w-full py-3 text-center border-t border-[#EEF0FC]">
                      <h3 className="font-medium text-gray-800 text-base">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow - Enhanced */}
          {showRightArrow && (
            <button
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-md hover:shadow-lg hover:bg-[#EEF0FC]/80 transition-all duration-300"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <FiChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;
