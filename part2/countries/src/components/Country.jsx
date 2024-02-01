const Country = ({ country, toggleShowDetails, isButtonHidden }) => {
    console.log("showDetails ", country.showDetails)

    if (country.showDetails === undefined) {
        country.showDetails = false
        console.log("showDetails ", country.showDetails)
    }

    if (country.showDetails === false) {
        return (
            <div>
                {country.name.common}
                <button onClick={toggleShowDetails}>show</button>
            </div>
        )
    }

    const commonName  = country.name.common
    const capitalCity = country.capital !== undefined ? country.capital[0] : ""
    const area = country.area
    const languages = Object.values(country.languages)
    const flagPath = country.flags.svg
    const flagDescription = country.flags.alt
    const imageWidth = "150"

    return (
        <div>
            <h1>
                {commonName}
                <button hidden={isButtonHidden} onClick={toggleShowDetails}>hide</button>
            </h1>
            <div>capital {capitalCity}</div>
            <div>area {area}</div>
            <p><strong>languages:</strong></p>
            <ul>
                {languages.map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={flagPath} alt={flagDescription} width={imageWidth} />
        </div>
    )
}

export default Country