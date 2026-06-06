import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

interface CourseProps {
  course: {
    name: string
    id: number
    parts: {
      id: number
      name: string
      exercises: number
    }[]
  }
}

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
