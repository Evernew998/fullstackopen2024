const Country = ({ country, areDetailsRequired }) => {
    console.log("areDetailsRequired: ", areDetailsRequired)

    if (areDetailsRequired === undefined) {
        areDetailsRequired = false
        console.log("areDetailsRequired: ", areDetailsRequired)
    }

    if (areDetailsRequired === false) {
        return (
            <div>
                {country.name.common}
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
            <h1>{commonName}</h1>
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