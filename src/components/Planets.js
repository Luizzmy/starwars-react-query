import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async (key) => {
    console.log(key)
    const res = await fetch(`https://swapi.dev/api/planets/?page=${key.queryKey[1]}`)
    return res.json()
}

const Planets = () => {

    const [page, setPage] = useState(1)
    console.log(page)

    // const { data, status } = useQuery(['planets', page], fetchPlanets, {
    //     //staleTime: 0, ///Fresh for X miliseconds before it becomes stale
    //     //cacheTime:10,  ///Will use cached data from x miliseconds ago, otherwise will refetch
    // onSuccess: () => console.log("message will be shown upon success")
    // })

    const {
        isLoading,
        isPreviousData,
        data,
        status
    } = useQuery(['planets', page], fetchPlanets, 
    { keepPreviousData : true } 
    //keepPreviousData in order to not show the loading part when fetching new data, but keep the previous data
    //Used to be usePaginatedQuery but now deprecated
    )


    return (
        <div>
            <h2>Planets</h2>
            {/* <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button> */}

            {status === "error" ?
                <div>There was an error</div>
                :
                isLoading ?
                    <div>Fetch is loading</div>
                    :
                    <>
                        <button
                            onClick={() => setPage(old => Math.max(old - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous Page
                        </button>
                        <span>{page}</span>
                        <button
                            onClick={() => {
                                if (!isPreviousData && data.next) {
                                    setPage(old => old + 1)
                                }
                            }}
                            // Disable the Next Page button until we know a next page is available
                            disabled={isPreviousData || !data?.next}
                        >
                            Next Page
                        </button>
                        <div>{data.results.map(planet => <Planet key={planet.name} planet={planet} />)}</div>
                    </>
            }
        </div>
    )
}

export default Planets
