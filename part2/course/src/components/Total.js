const Total = ({parts}) => "Total parts: " + parts.reduce((sum, obj) => sum + obj.exercises, 0)

export default Total