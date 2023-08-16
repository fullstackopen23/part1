import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.mostVoted]}</p>
      <p>has {props.votes[props.mostVoted]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVotes] = useState(0)
  // creates an array filled with 0's with the lengt of the anecdotes array
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const handleClick = () => {
    const randomInt = getRandomInt(anecdotes.length);
    if(selected === randomInt) {
      handleClick();
    } else {
      setSelected(randomInt)
    }
  }

  const handleVote = () => {
    
    const temp = votes.map((numberOfVotes, index) => {
      if(index === selected) {
        return numberOfVotes + 1;
      } else {
        return numberOfVotes;
      }
    })
    setVotes(temp)

    const mostVotes = Math.max(...temp);
    setMostVotes(temp.indexOf(mostVotes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} mostVoted={mostVoted} anecdotes={anecdotes}/>
    </div>
  )
}

export default App