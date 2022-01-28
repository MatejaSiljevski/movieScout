import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context/Context'


const Search = () => {
    const { setSubmiter} = useGlobalContext()
    const [searchTerm, setSearchTerm] = useState('a')
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmiter(searchTerm)   
    }
    return (
        <>
            <div className="form-box">
                <form className='input-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Search movie...' className='search-input' onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button type='submit'className='input-btn'>
                        Search
                    </button>
                </form>
            </div>
        </>
    )
}
export default Search