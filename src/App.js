import { useState, useEffect } from 'react';
import TeacherList from './components/TeacherList';
import './App.css';
import Header from './components/Header';
import TimeTable from './components/TimeTable';

function App() {
  const titles = ['teacher', 'socialworker', 'assistant'];
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetch('/data/teachersInfo.json')
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);


  const getFilteredItem = (title) => list.filter((item) => item.title === title);

  const handleFilterClick = (e) => {
    const filter = e.target.value;
    setFilteredList(getFilteredItem(filter));
    console.log('filteredList',filteredList);
    const options = filteredList.map((item) => {
      return {value : item.name, label : item.name, ...item}
    });
    setOptions(options)
    console.log('options',options);
  };

  return  <>
      <Header />
      <TimeTable />
      <TeacherList value='teacher' onFilterClick={handleFilterClick} options={options} />
      <TeacherList value='socialworker' onFilterClick={handleFilterClick} options={options} />
      <TeacherList value='assistant' onFilterClick={handleFilterClick} options={options}/>
    </>

}

export default App;
