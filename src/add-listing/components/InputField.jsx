import { Input } from "@/components/ui/input";
import React from "react";
import PropTypes from "prop-types";

function InputField({ item, handleInputChange, carInfo }) {
  if (!item || !handleInputChange) {
    return null; // Return null if required props are missing
  }

  return (
    <div className="w-full">
      <Input
        type={item.fieldType || "text"}
        name={item.name}
        placeholder={item.placeholder || ""}
        required={item.required || false}
        defaultValue={carInfo?.[item.name]}
        onChange={(e) => {
          if (e && e.target) {
            handleInputChange(item.name, e.target.value);
          }
        }}
        className="w-full rounded-md border border-gray-200"
      />
    </div>
  );
}

// Add PropTypes for better type checking
InputField.propTypes = {
  item: PropTypes.shape({
    fieldType: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  }),
  handleInputChange: PropTypes.func.isRequired,
};

export default InputField;
