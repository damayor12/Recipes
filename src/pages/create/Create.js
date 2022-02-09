import './Create.css';
import { projectFirestore } from '../../firebase/config';

import React, { useRef, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
import { useHistory } from 'react-router-dom';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  // const {postData, data} = useFetch('http://localhost:3000/recipes', 'POST')

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' };

    try {
      await projectFirestore.collection('recipes').add(doc);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //     if (data) {
  //       history.push('/');
  //     }
  // }, [data, history]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    }

    setNewIngredient('');
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div>
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
          </div>
          <button onClick={handleAdd} className="btn">
            add
          </button>
        </label>
        <p>
          Current ingredients:{' '}
          {ingredients.map((i) => (
            <em>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea onChange={(e) => setMethod(e.target.value)} value={method} required />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required />
        </label>

        {/* <Link to ='/'> */}
        <button className="btn">submit</button>
        {/* </Link> */}
      </form>
    </div>
  );
}
