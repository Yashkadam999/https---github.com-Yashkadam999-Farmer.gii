import React from 'react';
import About1 from './About1';

const people = [
  {
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    image: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTmUBil3VKoyHxjGHBj6Dgm1GfOoYwnEdpAIq_nFNZzFT_z8aQGi7Cwu9A8PjXE0PNgB5B6KrkOuXC1k9I'
  },
  {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mario_Molina_1c389_8387.jpg/1200px-Mario_Molina_1c389_8387.jpg'
  },
  {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    image: 'https://ychef.files.bbci.co.uk/624x351/p07r17dl.jpg'
  },
  {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVP8cLYg8RNz9EfkCYj_3Cmzxc4qvCKgumad0DaHfIitkV5fx5R2L8sYxTGF3fYW7snK58fH5vRpeGdkvGbOYUAw'
  },
  {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSH48zoSf16fJTJR-L84VApPdMJoRfb_LsrfORn0cVyLqq5hCsNzwthkwkMsaxr_0wDbze9MG0lKRVGAcoYOgWF5w'
  }
];

function About({ passingThings, isTrue, name }) {
  return (
    <div>
      <ul>
        <li>{isTrue ? <del>{name}</del> : name}</li>
      </ul>

      <p>This Is From About</p>
      <About1 passingThings={passingThings} />

      <h3>Full List of People:</h3>
      <ul>
        {people.map(person => (
          <li key={person.id}>
            <img src={person.image} alt={person.name} width="100" height="100" style={{ borderRadius: '8px' }} />
            <br />
            <strong>{person.name}</strong> — {person.profession}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Chemists Only:</h3>
      <ul>
        {people
          .filter(person => person.profession === 'chemist')
          .map(person => (
            <li key={person.id}>
              <img src={person.image} alt={person.name} width="100" height="100" style={{ borderRadius: '8px' }} />
              <br />
              <strong>{person.name}</strong> — {person.profession}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
