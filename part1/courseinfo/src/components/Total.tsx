interface TotalProps {
  parts: {
    exercises: number
  }[]
}

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <strong>total of {total} exercises</strong>
}

export default Total
