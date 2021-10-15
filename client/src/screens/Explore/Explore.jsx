import { useState, useEffect } from 'react'
import './Explore.css'
import Layout from '../../components/Layout/Layout'
import SectionDivider from '../../components/SectionDivider/SectionDivider'
import Search from '../../components/Search/Search.jsx'
// eslint-disable-next-line
import SearchBy from '../../components/SearchBy/SearchBy'
import ContinentBar from '../../components/ContinentBar/ContinentBar.jsx'
import StoryCard from '../../components/StoryCard/StoryCard'
import { getStories } from '../../services/stories.js'

export default function Explore(props) {
  const { continentFilter, setContinentFilter } = props;
  const [stories, setStories] = useState([]);
  const [searchResults, setSearchResults] = useState(['initial state'])
  // const [searchByField,setSearchByField]=useState('title')

  useEffect(() => {
    const fetchStories = async () => {
      const allStories = await getStories()
      setStories(allStories)
      if (continentFilter !== '') {
        const filteredStories = allStories.filter(story => {
            return story.continent === continentFilter
        })
        setSearchResults(filteredStories)
      } else {
        setSearchResults(allStories)
      }
    }
    fetchStories()
    // eslint-disable-next-line
  }, [])

  // function handleSearchBy(field) {
  //   if (field != '' && field != undefined) {
  //     setSearchByField(field)
  //   }
  // }

  // function handleSearch(event) {
  //   const searchValue = event.target.value.toLowerCase()
  //   // if (searchResults.length === 0) {
  //   //   setSearchResults(stories)
  //   // } else
  //     if (searchValue != '') {
  //     const results = searchResults.filter(story => {
  //       // story[searchByField].toLowerCase().includes(searchValue)
  //       story.title.toLowerCase().includes(searchValue)
  //     })
  //     setSearchResults(results)
  //     console.log(searchResults)
  //   }
  //   console.log(stories[0].title,searchValue,searchResults)
  // }
  function handleContinentClick(continent) {
    const results = stories.filter(story => {
      return (story.continent === continent)
    })
    setContinentFilter(continent)
    setSearchResults(results)
  }

  function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase()
    const results = stories.filter(story => {
      return (story.title.toLowerCase().includes(searchValue))
    })
    setSearchResults(results)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  // console.log(continentFilter)
  return (
    <Layout user={props.user}>
<div className='explore-search-container'>
      <img src='https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fres.cloudinary.com%2Fdyyjvyqtn%2Fimage%2Fupload%2Fv1634060377%2F33pOL_apxepy.jpg' alt='explore-back' />
      <div className='search-explore'>
      <h1 className='explore-title'>Explore</h1>

      <Search className='search-bar' handleSearch={handleSearch} handleSubmit={handleSubmit} />
      {/* <SearchBy handleSearchBy={handleSearchBy} handleSubmit={handleSubmit}/> */}
      </div>
      </div>
      <SectionDivider text='Continents' />
      <p>{continentFilter}</p>
      <ContinentBar continentFilter={continentFilter} setContinentFilter={setContinentFilter} handleContinentClick={handleContinentClick} linksOn={false} />

      <SectionDivider text='Stories' />
      <div className='stories-section'>
        <div className='mapped-images'>
        {searchResults.map((story, index) => <StoryCard key={index} story={story} />)}
        </div>
      </div>
    </Layout>
  )
}
