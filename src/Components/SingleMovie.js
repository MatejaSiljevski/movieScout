import React, { useEffect, useState } from "react";
import { image_300 } from "../Config/config";
import {Link} from 'react-router-dom'
import SolidWhite from '../Config/Solid_white.svg.webp'


const SingleMovie = ({id, overview, title, voteAverage, image, mediaType}) => {
    const [info, setInfo] = useState('')

    useEffect(()=> {
        if(overview.length > 300){
            setInfo(`${overview.slice(0,300)}...`)
        }else{
            setInfo(`${overview}`)
        }
    }, [overview])
    
    return (
        <> 
            <Link to={`/single-movie/${id}`} style={{textDecoration:'none', color:'#000'}}>
                <div className="single-movie">
                    <div className='image-box'>
                        <span className={voteAverage > 7  ?'vote-average above-color' : 'vote-average average-color'}>{voteAverage}</span>
                        {image ? 
                            <img className="movie-img" src={`${image_300}${image}`} alt=''/>
                        : 
                        <div className="solid-white">
                            <img src={SolidWhite} alt="" className="movie-img"/>
                            <p className="no-image">No image</p>
                        </div> 
                        }
                        
                        
                        <div className="info-box">
                            <p className='overview'>{info}</p>
                        </div>
                    </div>
                    <p className="title">{title}</p>
                </div>          
            </Link>
            
        </> 
    )
}

export default SingleMovie
