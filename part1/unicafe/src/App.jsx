import { useState } from 'react'

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;

  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(total) === 0 ? 0 : (props.good * 1 + props.neutral * 0 + props.bad * -1) / (total)} />
        <StatisticLine text="positive" value={(total) === 0 ? 0 : (props.good / (total)) * 100 + '%'} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

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
      <Button handleClick={() => handleClick('good')} text="good" />
      <Button handleClick={() => handleClick('neutral')} text="neutral" />
      <Button handleClick={() => handleClick('bad')} text="bad" />
      <h1>statics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App