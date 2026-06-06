import Part from "./Part"

interface ContentProps {
  parts: {
    id: number
    name: string
    exercises: number
  }[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

export default Content
