import React, { useEffect, useState } from 'react';
import TeacherCard from './TeacherCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';

const animatedComponents = makeAnimated();

const getDatafromLocalStorage = (value) => {
  const data = localStorage.getItem(value);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function TeacherList({ value, list }) {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState('');
  const [itemList, setItemList] = useState([]);

  const filteredList = list.filter((item) => item.title === value);
  const options = filteredList.map((item) => {
    return { value: item.name, label: item.name, ...item };
  });

  const filteredLS = itemList.filter((item) => item.title === value);

  const handleToggleOpen = (e) => {
    setToggle(e.target.value);
  };

  const handleSubmit = (e) => {
    const targetTitle = e.target.value;
    localStorage.setItem(`${targetTitle}`, JSON.stringify(selected));
    setToggle('');
    showItems();
  };

  const showItems = () => {
    const teacherList = getDatafromLocalStorage('teacher');
    const assistantList = getDatafromLocalStorage('assistant');
    const socialworkerList = getDatafromLocalStorage('socialworker');
    setItemList(() => [...teacherList, ...assistantList, ...socialworkerList]);
  };

  useEffect(() => {
    showItems();
  }, []);

  return (
    <div className="my-20">
      <button value={value} className="text-2xl my-5" onClick={handleToggleOpen}>
        {value}
      </button>
      {toggle === '' && (
        <div className="flex">
          <TeacherCard items={filteredLS} key={uuidv4()} />
        </div>
      )}
      {value === toggle && (
        <div>
          <div className="flex">
            <Select className="w-1/2 mr-5" closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} onChange={(items) => setSelected(items)} />
            <button value={value} onClick={handleSubmit} className="hover:bg-slate-500">
              select
            </button>
          </div>
          <div className="flex">
            <TeacherCard items={selected} key={uuidv4()} />
          </div>
        </div>
      )}
    </div>
  );
}
