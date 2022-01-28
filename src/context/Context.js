import React, {useState, useContext, createContext, useEffect} from 'react'
import axios from 'axios'
const AppContext = createContext()


const AppProvider = ({children}) => {
    const [submiter, setSubmiter] = useState('')
    const [content, setContent] = useState([])
    const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=0ae4454c11a52b3bc3bdcb85d8dc4ea5'
    const specificMovie = `https://api.themoviedb.org/3/search/movie?api_key=0ae4454c11a52b3bc3bdcb85d8dc4ea5&query=${submiter}`
    


    const fetcher = async () => {
        setSubmiter('')
        const { data } = await axios.get(url) 
        setContent(data.results)  
    }

    const searchMovie = async () => {
        const {data} = await axios.get(specificMovie)
        let movies = data.results
        let movieList = []
        movies.map(movie => {         
            let movieName = ''
            if(typeof movie.title === 'undefined')
                movieName = movie.name
            else
                movieName = movie.title
            if(movieName.toLowerCase().includes(submiter.toLowerCase())){
                movieList.push(movie)
                movieList.filter(e => e.poster_path !== null)
            }
            return movieList
        })
        setContent(movieList)     
    } 

   

    useEffect(()=> {
            if(submiter){
                searchMovie()
            }
            else{
                fetcher()
            }
    },[submiter])

   

    return (
        <AppContext.Provider value={{ content, fetcher, searchMovie,setSubmiter,}}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}