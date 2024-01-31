const Filter = ({ handleFilter }) => {
    return (
        <div>
            find countries <input onChange={handleFilter}></input>
        </div>
    )
}

export default Filter