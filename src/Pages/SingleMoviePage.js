import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {image_300} from '../Config/config'
import Imdb from '../images/imdb.png'
import BetterArrow from '../images/betterArrow.png'
import {Link} from 'react-router-dom'
import Loading from '../images/camera-loading.png'


function SingleMoviePage() {
    const {id} = useParams()
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(false)

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0ae4454c11a52b3bc3bdcb85d8dc4ea5`

    useEffect(() => {
        setLoading(true)
        const fetcheById = async () => {
            try{
                const response = await fetch(url)
                const data = await response.json()
                
                if(data) {
                    const {poster_path, budget, genres, overview, popularity, release_date, title, video, imdb_id, mediaType } = data
                    const allItems = {poster_path, budget, genres, overview, popularity, release_date, title, video, imdb_id, mediaType}
                    setContent(allItems)
                    setLoading(false)
                }else{
                    setContent([])
                }
                
            }catch(error) {
                console.log(error);
            }         
        }
        
        fetcheById()
    }, [url])
    
    
    if(loading){
        return  <>
                    <img className='loading' src={Loading} alt=''></img>
                </>
    }

    if(!content) {
        return <></>
    }else {
        if(content.overview === undefined) {
            return <>
                    <Link to="/">
                                <img src={BetterArrow} className='modal-arrow' alt="" />
                            </Link>
                    <p className='no-display'>No movie to display...</p>
                    </>
        }

        const {poster_path, budget, genres, overview, popularity, release_date, title, imdb_id } = content
        const genreNames = genres.map((item) => {
            return item.name
        })
        const genreNamesComa = genreNames.map((item, i) => {
                if(genreNames.length - 1 === i) {
                    return `${item}`
                }else {
                    return `${item}, `
                }
        })
        
        
        return (
                <div>
                    <div className="movie-modal-container">
                    <Link to="/">
                        <img src={BetterArrow} className='modal-arrow' alt="" />
                    </Link>
                        <div className="movie-modal-box">
                            <Link to="/">
                            <img src={BetterArrow} className='modal-box-arrow' alt="" />
                            </Link>
                            <img src={`${image_300}${poster_path}`} alt="" className="modal-movie-img"/> 
                            <div className="modal-info">
                                <p className='modal-title'>{title}</p>
                              
                                <span className="modal-pop"><span className="modal-span-desc">Popularity:</span>{popularity}</span>
                                
                                <span className='modal-genres'>Genres:
                                    {genreNamesComa.map((item, id) => {
                                    return <span key={id} className='modal-genres-items'>{item}</span>
                                        
                                    })}

                                </span>
                                
                                <span className='modal-budget'><span className='modal-span-desc'>Budget:</span> {budget}$</span>
                                <p className="modal-overview">{overview}</p>
                                <span><span className='modal-span-desc'>Release Date:</span> {release_date}</span>
                                <a href={`https://www.imdb.com/title/${imdb_id}/`} rel="noreferrer" target="_blank"><img src={Imdb} alt="" className='imdb'/></a>
                            </div>
                        </div>
                    </div>
                </div>
        
        )}
    }
export default SingleMoviePage
