const Total = ({parts}) => "Total parts: " + parts.reduce((sum, obj) => sum + obj.ex, 0)

export default Total