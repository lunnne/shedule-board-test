import React, { useState } from 'react';
import TeacherCard from './TeacherCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';

const animatedComponents = makeAnimated();

export default function TeacherList({ value, list }) {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState('')

  const filteredList = list.filter((item) => item.title === value);
  const options = filteredList.map((item) => {
    return {value : item.name, label : item.name, ...item}
  });

  const handleToggleOpen = (e) => {
    setToggle(e.target.value)
  }

  return (
    <div className='my-20'>
      <button value={value} className='text-2xl' onClick={handleToggleOpen} >
        {value}
      </button>
     {value === toggle && <div className='flex'>
        <Select className='w-1/2 mr-5' closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} onChange={(items) => setSelected(items)} />
        <button onClick={()=> setToggle('')} className='hover:bg-slate-500'>select</button>
      </div>}
      <div className="flex">
        <TeacherCard items={selected} key={uuidv4()} />
      </div>
    </div>
  );
}
