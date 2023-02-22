import React from 'react';

export default function TeacherCard({ items }) {


  return (
    <>
      {items.map((item) => <div className= 'flex flex-col justify-center items-center' >
        <img className='w-36 h-36 rounded-full' src={require(`../asset/${item.name}.png`)} alt={item.name}/>
        <p className='text-xl'>{item.name}</p>
      </div> )}
    </>
  );
}
