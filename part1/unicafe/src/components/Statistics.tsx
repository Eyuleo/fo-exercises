import StatisticLine from "./StatisticLine "

interface StatisticsProps {
  good: number
  neutral: number
  bad: number
}

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + neutral + bad || 1)}
      />
      <StatisticLine
        text="positive"
        value={(good * 100) / (good + neutral + bad || 1)}
      />
    </>
  )
}
export default Statistics
