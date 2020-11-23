import React, { useState, useEffect} from "react";
import axios from 'axios';
import ImgMediaCard from './ImgMediaCard'


const ListItems = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ recipes: []})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://lettuceshop-api.herokuapp.com/'
      );
      console.log(result.data)
      setData({ recipes: result.data })
      setLoading(false)
    };
    fetchData();
  }, [])

  return(
    <>
    <div className="listitems">ListItems</div>
    {loading ?
    <h1>loading</h1>
    :     <div>{data.recipes && data.recipes.map(item => {
      return(
      <ul>
        <li key={item.recipe_id}>
          <a href={item.recipeInstructions_url}>{item.name}</a>
        </li>
      </ul>
      )
    })}</div>}

    <ImgMediaCard />
    </>

  )
}

export default ListItems