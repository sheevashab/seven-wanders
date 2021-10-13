import './ContinentBar.css'
import Africa from './continent-images/Africa.png'
import Asia from './continent-images/Asia.png'
import SouthAmerica from './continent-images/SouthAmerica.png'
import NorthAmerica from './continent-images/NorthAmerica.png'
import Antarctica from './continent-images/Antarctica.png'
import Europe from './continent-images/Europe.png'
import Australia from './continent-images/Australia.png'
import { Link } from 'react-router-dom'


export default function ContinentBar(props) {
  const continents = [{ name: 'Asia', image: Asia }, { name: 'South America', image: SouthAmerica }, { name: 'Antarctica', image: Antarctica }, { name: 'Africa', image: Africa }, { name: 'Australia', image: Australia }, { name: 'North America', image: NorthAmerica }, { name: 'Europe', image: Europe }]

  const linkOptions = (
    <>
      <Link to='/explore' />
    </>
  )

  return (
    <div className='continent-bar'>
      {continents.map((continent, index) => {
        return <Link to='/explore' className='continent-button'
          onClick={(e) => props.setContinentFilter(e.target.name)
          }
          name={continent.name}
          key={index}
        >
          <img src={continent.image} alt={continent.name} />
          <p>{`${continent.name}`}</p>
        </Link>
      })}
    </div>
  )
}
