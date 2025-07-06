import React from "react";
import PropTypes from "prop-types";
import {
  FaClipboardList,
  FaTag,
  FaDollarSign,
  FaMoneyBillAlt,
  FaCar,
  FaCheckCircle,
  FaChargingStation,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaCircle,
  FaPalette,
  FaDoorClosed,
  FaIdCard,
  FaTags,
  FaFileAlt,
} from "react-icons/fa";

const iconMap = {
  FaClipboardList: <FaClipboardList className="w-5 h-5" />,
  FaTag: <FaTag className="w-5 h-5" />,
  FaDollarSign: <FaDollarSign className="w-5 h-5" />,
  FaMoneyBillAlt: <FaMoneyBillAlt className="w-5 h-5" />,
  FaCar: <FaCar className="w-5 h-5" />,
  FaCheckCircle: <FaCheckCircle className="w-5 h-5" />,
  FaChargingStation: <FaChargingStation className="w-5 h-5" />,
  FaIndustry: <FaIndustry className="w-5 h-5" />,
  FaCarSide: <FaCarSide className="w-5 h-5" />,
  FaCalendarAlt: <FaCalendarAlt className="w-5 h-5" />,
  FaRoad: <FaRoad className="w-5 h-5" />,
  FaCogs: <FaCogs className="w-5 h-5" />,
  FaGasPump: <FaGasPump className="w-5 h-5" />,
  FaTachometerAlt: <FaTachometerAlt className="w-5 h-5" />,
  FaWrench: <FaWrench className="w-5 h-5" />,
  FaCircle: <FaCircle className="w-5 h-5" />,
  FaPalette: <FaPalette className="w-5 h-5" />,
  FaDoorClosed: <FaDoorClosed className="w-5 h-5" />,
  FaIdCard: <FaIdCard className="w-5 h-5" />,
  FaTags: <FaTags className="w-5 h-5" />,
  FaFileAlt: <FaFileAlt className="w-5 h-5" />,
};

function IconField({ icon, className = "" }) {
  if (!icon || !iconMap[icon]) {
    console.warn(`Icon "${icon}" not found in iconMap`);
    return null;
  }

  return (
    <div
      className={`text-gray-500 hover:text-gray-700 transition-colors ${className}`}
    >
      {iconMap[icon]}
    </div>
  );
}

IconField.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  className: PropTypes.string,
};

export default IconField;
