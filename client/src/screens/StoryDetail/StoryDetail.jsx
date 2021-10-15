import './StoryDetail.css'
import Layout from '../../components/Layout/Layout'
import { getStory } from '../../services/stories'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import { Link } from 'react-router-dom';

export default function StoryDetail(props) {
  const [theStory, setTheStory] = useState({});
  //keeping _id for postMVP user edit auth
  // eslint-disable-next-line
  const {_id,title,location,country,continent,author,story,imageURL}=theStory
  const { id } = useParams()
  
  useEffect(() => {
    const fetchStory = async (storyID) => {
      const aStory = await getStory(storyID)
        setTheStory(aStory)
    }
    fetchStory(id)
    // eslint-disable-next-line
  },[])

  return (
    <Layout user={props.user}>
<div className='edit-page'>
      <div className='edit-page-details'>
        
        <SectionDivider text={`${country}, ${continent}`} />
        <h1>{`${title}`}</h1>
        <p>by {author}</p>
        <img src={imageURL} alt={location} />
        <section>{story}</section>
        <div className='button-section'>
        <Link className='button' to={`/stories/${id}/edit`}><button>Edit Story</button></Link>
      </div>
    </div>
    </div>
    </Layout> 
  )
}
