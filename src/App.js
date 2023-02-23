import { useState, useEffect } from 'react';
import TeacherList from './components/TeacherList';
import './App.css';
import Header from './components/Header';
import TimeTable from './components/TimeTable';

function App() {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    fetch('/data/teachersInfo.json')
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  return  <>
      <Header />
      <TeacherList value='teacher' list={list} />
      <TeacherList value='socialworker' list={list} />
      <TeacherList value='assistant' list={list}/>
    </>

}

export default App;
