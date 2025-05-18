import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        console.log('something went wrong')
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleClick('good')}>good</button>
      <button onClick={() => handleClick('neutral')}>neutral</button>
      <button onClick={() => handleClick('bad')}>bad</button>
      <h1>statics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}</p>
      <p>positive {( good + neutral + bad ) === 0 ? 0 : (good / (good + neutral + bad)) * 100} %</p>
    </div>
  )
}

export default App