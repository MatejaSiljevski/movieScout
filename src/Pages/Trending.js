import React from 'react'
import SingleMovie from '../Components/SingleMovie'
import { useGlobalContext } from '../context/Context'
import Search from '../Components/Search'

const Trending = () => {
    const { fetcher, content} = useGlobalContext()


    if(!content){
        return <p>We are working on a problem. Please be patient...</p>
    }else {
        return (
            <> 
                <div className="trending-page-container">
                    <Search />
                    <button className='trending-btn' onClick={fetcher}>
                            Find Trending
                    </button>
                    <div className="movie-container">
                            {
                                content && content.map((movie) => {
                                    return (
                                            <SingleMovie id={movie.id} genre={movie.genre} title={movie.title || movie.name} voteAverage={movie.vote_average} overview={movie.overview} image={movie.poster_path} key={movie.id} mediaType={movie.media_type} />
                                    )
                                })
                            }
                    </div>
                </div> 
    
            </>
        )
    }
}

export default Trending