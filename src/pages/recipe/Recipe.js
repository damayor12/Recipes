import './Recipe.css';
// import RecipeList from '../../components/RecipeList';

import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';
export default function Recipe() {

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);


  const { id } = useParams()
  const { mode } = useTheme();

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  useEffect(()=>{
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=> {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError('could not find that recipe')
      }
    })

    return ()=> unsub()
  },[])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && console.log(recipe)}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>ing</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}