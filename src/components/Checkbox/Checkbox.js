import './Checkbox.css';
import React from 'react';

export default function Checkbox({ isChecked, onCheck }) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input className="checkbox__input" type="checkbox" onChange={onCheck} checked={isChecked}/>
        <span className="checkbox__slider"></span>
      </label>
    </div>
  );
};