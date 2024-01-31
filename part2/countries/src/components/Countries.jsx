import Country from "./Country";

const Countries = ({ countries }) => {
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
                {countries.map(c => <Country key={c.name.common} country={c} areDetailsRequired={false}/>)}
            </div>
        )
    }

    return <Country country={countries[0]} areDetailsRequired={true} />
}

export default Countries