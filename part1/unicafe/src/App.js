import { useState } from 'react'

const Header = () => <h2>Leave feedback: </h2>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics: </h2>
      {!props.all ? (
        <div>No feedback yet.</div>
      ) : (
        <table>
          <tbody>
            <Statistic text="Good" value={props.good}/>
            <Statistic text="Neutral" value={props.neutral}/>
            <Statistic text="Bad" value={props.bad}/>
            <Statistic text="All" value={props.all}/>
            <Statistic text="Average" value={props.average}/>
            <Statistic text="Positive" value={props.positive}/>
          </tbody>
        </table>
      )}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (all ? (good * 100) / all : 0) + "%";


  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}/>
    </div>
  )
}

export default App