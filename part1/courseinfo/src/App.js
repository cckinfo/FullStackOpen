const Header = (prop) => (
  <h1>{prop.course}</h1>
)

const Content = (prop) => (
  <>
    <Part part={prop.parts[0].name} ex={prop.parts[0].ex}/>
    <Part part={prop.parts[1].name} ex={prop.parts[1].ex}/>
    <Part part={prop.parts[2].name} ex={prop.parts[2].ex}/>
  </>

)

const Part = (prop) => (
  <p>{prop.part}: {prop.ex}</p>
)

const Total = (prop) => (
  <>Total exercises: {prop.parts[0].ex +
                      prop.parts[1].ex +
                      prop.parts[2].ex}</>
)

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
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App