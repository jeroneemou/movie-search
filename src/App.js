import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};

const S_REQUEST = 'SEARCH_MOVIES_REQUEST';
const S_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
const S_ERROR = 'SEARCH_MOVIES_FAILURE';

const reducer = (state, action) => {
    switch (action.type) {
        case S_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
            break;
        case S_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
            break;
        case S_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            break;
        default:
            return state;
    }
};

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        search('man');
    }, []);

    useEffect(() => {
        console.log("It did change! ", state);
    })

    const search = async term => {
        try {
            // Reset bad state
            dispatch(S_REQUEST)

            // Search for movies
            const response = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=4a3b711b`);
            const jsonResponse = await response.json();

            if (jsonResponse.Response === "True") {
                dispatch({
                    type: S_SUCCESS,
                    payload: jsonResponse.Search
                });
            } else {
                dispatch({
                    type: S_ERROR,
                    error: jsonResponse.Error
                })
            }
        } catch (e) {
            dispatch({
                type: S_ERROR,
                error: e.message
            })
        }
    };


    const { movies, error, loading } = state;

    return (
        <div className="App">
            <Header text="Whatever"></Header>
            <Search handleSearch={search}></Search>
            <p className="App-intro">Sharing some of our favourite movies</p>
            <div className="movies">
                {loading && !error ? (
                    <span>loading...</span>
                ) : error ? (
                    <div className="errorMessage">{error}</div>
                ) : (
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
