interface PartProps {
  part: string
  exercises: number
}
const Part = ({ part, exercises }: PartProps) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Part
