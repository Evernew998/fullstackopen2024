import Country from "./Country";

const Countries = ({ countries, toggleShowDetails }) => {
    let isButtonHidden = false

    if (countries.length === 0) {
        return (
            null
        )
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length > 1) {
        return (
            <div>
                {countries
                    .map(c => <Country key={c.name.common} 
                                country={c}
                                toggleShowDetails={() => toggleShowDetails(c)}
                                isButtonHidden={isButtonHidden}
                                />
                        )
                }
            </div>
        )
    }

    isButtonHidden = true
    countries[0].showDetails = true
    return (
        <Country 
            country={countries[0]} 
            toggleShowDetails={() => toggleShowDetails(countries[0])} 
            isButtonHidden={isButtonHidden}
        />
    )
}

export default Countries