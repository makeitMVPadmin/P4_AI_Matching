import React, { useEffect, useState } from "react";
import "./DropdownCheckbox.scss";

const DropdownCheckbox = ({
  onChangeDropdownCheckbox,
  labelName,
  options1,
  existingValue,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const isMoreThanSix = options1.length > 6;
  useEffect(() => {
    setSelectedValues(existingValue);
  }, [existingValue]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(updatedValues);
    onChangeDropdownCheckbox(updatedValues);
  };

  return (
    <div className="dropdown-checkbox">
      <div className="dropdown-checkbox__block">
        <div className="dropdown-checkbox__details">
          <label className="dropdown-checkbox__label">{labelName}</label>
          <div
            className={`dropdown-checkbox__group ${
              isMoreThanSix ? "three-columns" : "one-coloums"
            }`}
          >
            {options1.map((option, index) => (
              <label key={index} className="dropdown-checkbox__item">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedValues.includes(option)}
                  onChange={handleCheckboxChange}
                />
                <span className="checkbox-custom"></span>
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownCheckbox;
