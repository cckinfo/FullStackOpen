import { Part } from '../index.js'

const Content = ({parts}) => (parts.map(x => <Part key={x.id} part={x.name} ex={x.exercises}/>)
    )

export default Content