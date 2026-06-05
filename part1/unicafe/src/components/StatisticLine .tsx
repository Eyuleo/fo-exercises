const StatisticLine = ({ text, value }: { text: string; value: number }) => {
  return (
    <p>
      {text}: {value}
    </p>
  )
}

export default StatisticLine
