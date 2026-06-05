interface TotalProps {
  parts: {
    exercises: number
  }[]
}

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

export default Total
