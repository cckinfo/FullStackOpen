import { Part } from '../index.js'

const Content = ({parts}) => (parts.map((x, i) => <Part key={i} part={x.name} ex={x.ex}/>))

export default Content