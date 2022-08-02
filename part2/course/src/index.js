import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import Total from "./components/Total"
import Content from "./components/Content"
import Part from "./components/Part"
import Course from "./components/Course"

import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

export { Header, Total, Content, Part, Course }
