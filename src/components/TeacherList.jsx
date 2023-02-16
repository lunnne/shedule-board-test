import React, { useState } from 'react';
import TeacherCard from './TeacherCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export default function TeacherList({ value, onFilterClick, options }) {
  const [selected, setSelected] = useState([]);

  return (
    <div className='my-20'>
      <button value={value} onClick={onFilterClick}>
        {value}
      </button>
      <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} onChange={(items) => setSelected(items)} />
      <div className="flex">
        <TeacherCard items={selected} />
      </div>
    </div>
  );
}
