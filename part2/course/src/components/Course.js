import {Header, Content, Total} from '../index.js'

const Course = ({course}) => (
    <> 
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </>
)

export default Course