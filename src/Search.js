import React, {useState} from "react";

const Search = (props) => {

    const [searchValue, setSearchValue] = useState("");

    const resetSearchValue = _ => {
        setSearchValue("");
    }

    const handleInputSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.handleSearch(searchValue);
        resetSearchValue();
    };

    return (
        <form className="search">
            <input type="text" value={searchValue} onChange={handleInputSearchChange}/>
            <input type="submit" value="search" onClick={handleSearchClick}/>
        </form>
    );
};

export default Search;