import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td> 
      <td>{props.amount}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.buttonText}</button>
  )
}

const Statistics = (props) => {
  if(props.all <= 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <>
        <table>
          <h2>statistics</h2>
          <StatisticLine name="good" amount={props.good}/>
          <StatisticLine name="neutral" amount={props.neutral}/>
          <StatisticLine name="bad" amount={props.bad}/>
          <StatisticLine name="all" amount={props.all}/>
          <StatisticLine name="average" amount={props.average}/>
          <StatisticLine name="positive" amount={props.positive}/>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateAverage = (good, bad, all) => {
    setAverage((good - bad) / all)
  }

  const updatePositive = (good, all) => {
    setPositive(((good/all) * 100) + " %")
  }

  const handleClickGood = () => {
    const newValue = good + 1;
    const newAll = all + 1;
    updateAverage(newValue, bad, newAll)
    updatePositive(newValue, newAll)
    setGood(newValue)
    setAll(newValue + neutral + bad)
  }

  const handleClickNeutral = () => {
    const newValue = neutral + 1
    const newAll = all + 1
    updateAverage(good, bad, newAll)
    updatePositive(good, newAll)
    setNeutral(newValue)
    setAll(good + newValue + bad)
  }

  const handleClickBad = () => {
    const newAll = all + 1;
    const newValue = bad + 1
    updatePositive(good, newAll)
    updateAverage(good, newValue, newAll)
    setBad(newValue)
    setAll(good + neutral + newValue)
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button buttonText={"good"} handleClick={handleClickGood}/>
      <Button buttonText={"neutral"} handleClick={handleClickNeutral}/>
      <Button buttonText={"bad"} handleClick={handleClickBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App