import { useEffect, useState } from "react"

function App() {
  const [countries, setCountries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true)
      const response = await fetch(
        "https://studies.cs.helsinki.fi/restcountries/api/all",
      )
      const data = await response.json()
      setCountries(data)
      setIsLoading(false)
    }

    fetchCountries()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedCountry = filteredCountries.length === 1 ? filteredCountries[0] : null

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
          />
        </div>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
          </div>
        ))
      )}
    </>
  )
}

export default App
