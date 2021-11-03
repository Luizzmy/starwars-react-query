import React from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async () => {
    const res = await fetch("http://swapi.dev/api/planets/")
    return res.json()
}

const Planets = () => {

    const { data, status } = useQuery('planets', fetchPlanets, {
        //staleTime: 0, ///Fresh for X miliseconds before it becomes stale
        //cacheTime:10,  ///Will use cached data from x miliseconds ago, otherwise will refetch
        onSuccess: () => console.log("message will be shown upon success")
    })
    console.log(data)

    return (
        <div>
            <h2>Planets</h2>
            {status === "error" ?
                <div>There was an error</div>
                :
                status === "loading" ?
                    <div>Fetch is loading</div>
                    :
                    <div>{data.results.map(planet => <Planet key={planet.name} planet={planet} />)}</div>}
        </div>
    )
}

export default Planets
