import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [book, setBook] = useState([]);
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const fetch = async () => {
    const { data } = await axios.get('/api/persons')
    setBook(data);
  }

  useEffect(() => {
    fetch();
  }, [])

  const handleDelete = async (e) => {
    await axios.delete(`/api/persons/${e.target.id}`)
    fetch();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post('/api/persons', {
        name, 
        number
      })
      fetch();
    } catch (error) {
      const beforeContactUpdate = window.confirm(`You are about to update the contact '${name}', Do you want to proceed?`);
      if (beforeContactUpdate) {
        for (let person of book) {
          if (person.name === name) {
            (async () => {
              await axios.put(`/api/persons/${person.id}`, {
                name,
                number
              });
            })()
            fetch();
          }
        }
      } else return;
    }
  } 

  return (
    <div className="App">
      <h1>Phone Book</h1>
      <ul>
        {book.map(item => 
          <li key={item.id}>{item.name} {item.number} <button id={item.id} onClick={handleDelete}>delete</button></li>
        )}
      </ul>

      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} type='text' placeholder='name' required/>
        <input onChange={(e) => setNumber(e.target.value)} type='text' placeholder='number' required/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;