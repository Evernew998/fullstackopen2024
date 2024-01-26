import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <>
    <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  let endText = ""
  if (text === "positive") {
    endText = "%"
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {endText}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  const average = (good - bad) / total
  const positive = good / total * 100
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (buttonText) => () => {
    if (buttonText === "good") {
      return setGood(good + 1)
    }
    else if (buttonText === "neutral") {
      return setNeutral(neutral + 1)
    }
    else if (buttonText === "bad") {
      return setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleClick("good")}/>
      <Button text="neutral" handleClick={handleClick("neutral")}/>
      <Button text="bad" handleClick={handleClick("bad")}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App