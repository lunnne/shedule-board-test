import React, { useEffect, useState } from 'react';
import TeacherCard from './TeacherCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';

const animatedComponents = makeAnimated();

export default function TeacherList({ value, list }) {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState('');
  const [itemList, setItemList] = useState([{ value: 'Maria', label: 'Maria', name: 'Maria', title: 'teacher', subject: 'math' }]);

  const filteredList = list.filter((item) => item.title === value);
  const options = filteredList.map((item) => {
    return { value: item.name, label: item.name, ...item };
  });

  const handleToggleOpen = (e) => {
    setToggle(e.target.value);
  };

  const handleSubmit = (e) => {
    const targetTitle = e.target.value;
    localStorage.setItem(`${targetTitle}`, JSON.stringify(selected));
    setToggle('');
    setSelected([]);
  };

  return (
    <div className="my-20">
      <button value={value} className="text-2xl" onClick={handleToggleOpen}>
        {value}
      </button>
     {toggle==''&&<TeacherCard items={itemList}/>}
      {value === toggle && (
        <div>
          <div className="flex">
            <Select className="w-1/2 mr-5" closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} onChange={(items) => setSelected(items)} />
            <button value={value} onClick={handleSubmit} className="hover:bg-slate-500">
              select
            </button>
          </div>
          <div className="flex">
            <TeacherCard items={selected} localItem={itemList} key={uuidv4()} />
          </div>
        </div>
      )}
    </div>
  );
}
