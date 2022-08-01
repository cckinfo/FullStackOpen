import {Course} from './index.js'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        ex: 10
      },
      {
        name: 'Using props to pass data',
        ex: 7
      },
      {
        name: 'State of a component',
        ex: 14
      }
    
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App