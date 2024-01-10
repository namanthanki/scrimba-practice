import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';

import data from './utils/data';

const App = () => {
  const cards = data.map((obj) => {
    return (
      <Card
        key={obj.id} 
        {...obj}
      />
    )
  })

  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards--list">
        {cards}
      </section>
    </div>
  )
}

export default App;