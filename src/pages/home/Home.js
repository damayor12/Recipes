import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';

import { projectFirestore } from '../../firebase/config';
// import { useFetch } from '../../hooks/useFetch';


import './Home.css';


// import RecipeList from '../../components/RecipeList'

export default function Home() {
  // const { data, isPending, error } = useFetch('http://localhost:3000/recipes');

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot)=> {
      if (snapshot.empty) {
        setError('No recipes to load, sorry')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()})
        })
        setData(results)
        setIsPending(false)
      }
    }, (err)=> {
      setError(err)
      setIsPending(false)
    })

    return ()=> unsub()
  },[])
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
     
      {data && <RecipeList recipes={data}/>}
    </div>
  );
}
