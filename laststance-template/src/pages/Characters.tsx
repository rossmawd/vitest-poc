import React, { useEffect } from 'react'
import '../index.css'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Characters: React.FC = () => {
  const [characters, setCharacters] = React.useState<Array<any>>([])
  const navigate = useNavigate()

  const getCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      setCharacters(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <main className="Characters">
      <header className="Characters-header">
        <div className="bg-slate-100 max-w-max flex justify-start flex-1 p-3">
          <button onClick={() => navigate('/')}>Go back</button>
        </div>
        <>
          {characters &&
            characters.map((character) => {
              return <div className="text-semibold p-2">{character?.name}</div>
            })}
        </>
      </header>
    </main>
  )
}

export default Characters
