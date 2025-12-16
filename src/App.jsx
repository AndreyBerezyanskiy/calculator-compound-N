import { useState, useEffect } from 'react'

function App() {
  const [initialCapital, setInitialCapital] = useState(100)
  const [months, setMonths] = useState(3)
  const [monthlyRate, setMonthlyRate] = useState(10)
  const [monthlyAddition, setMonthlyAddition] = useState(5)
  const [result, setResult] = useState(null)

  const calculate = (capital, months, rate, addition) => {
    let current = parseFloat(capital)
    const history = []
    let totalIncome = 0

    for (let i = 1; i <= months; i++) {
      const income = parseFloat((current * (rate / 100)).toFixed(2))
      current += income + parseFloat(addition)
      totalIncome += income

      history.push({
        month: i,
        start: (current - income - addition).toFixed(2),
        income: income.toFixed(2),
        addition: parseFloat(addition).toFixed(2),
        end: current.toFixed(2),
      })
    }

    setResult({
      finalAmount: current.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      history,
    })
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    calculate(initialCapital, months, monthlyRate, monthlyAddition)
  }

  useEffect(() => {
    calculate(initialCapital, months, monthlyRate, monthlyAddition)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-700 p-4">
      <div className="flex flex-col gap-8 bg-gray-200 border border-gray-400 rounded-2xl shadow-lg text-black p-6 max-w-5xl w-full">
        <div className='w-full h-full'>
          <h1 className='text-5xl font-bold text-center text-green-800'>Капітал з 1%</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-4'>
        <div className="w-full md:max-w-4/12 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Калькулятор</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleCalculate}>
            <div className="relative w-full">
              <input
                type="number"
                id="initialCapital"
                placeholder=" "
                className="peer w-full h-12 p-2 border border-gray-600 rounded-md transition-colors duration-300 focus:border-green-400 focus:outline-none"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
                required
              />
              <label
                htmlFor="initialCapital"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 px-1 text-sm bg-gray-700 text-gray-400 transition-all duration-300
                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
              >
                Стартовий капітал ($)
              </label>
            </div>

            <div className="relative w-full">
        <input
          type="number"
          id="months"
          placeholder=" "
          className="peer w-full h-12 p-2 border border-gray-600 rounded-md transition-colors duration-300 focus:border-yellow-400 focus:outline-none"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          required
        />
        <label
          htmlFor="months"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 px-1 text-sm bg-gray-700 text-gray-400 transition-all duration-300
            peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
            peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
        >
          Кількість періодів
        </label>
      </div>

<div className="relative w-full">
  <input
    type="number"
    id="monthlyRate"
    placeholder=" "
    className="peer w-full h-12 p-2 border border-gray-600 rounded-md transition-colors duration-300 focus:border-yellow-400 focus:outline-none"
    value={monthlyRate}
    onChange={(e) => setMonthlyRate(e.target.value)}
    required
  />
  <label
    htmlFor="monthlyRate"
    className="absolute left-2.5 top-1/2 -translate-y-1/2 px-1 text-sm bg-gray-700 text-gray-400 transition-all duration-300
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
  >
    Середня дохідність за 1 період (%)
  </label>
</div>

<div className="relative w-full">
  <input
    type="number"
    id="monthlyAddition"
    placeholder=" "
    className="peer w-full h-12 p-2 border border-gray-600 rounded-md transition-colors duration-300 focus:border-yellow-400 focus:outline-none"
    value={monthlyAddition}
    onChange={(e) => setMonthlyAddition(e.target.value)}
    required
  />
  <label
    htmlFor="monthlyAddition"
    className="absolute left-2.5 top-1/2 -translate-y-1/2 px-1 text-sm bg-gray-700 text-gray-400 transition-all duration-300
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-400
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
  >
    Докладання кожен період ($)
  </label>
</div>

            <div>
              <button type="submit" className="w-full h-12 bg-green-800 text-white p-2 rounded-2xl hover:bg-green-600 duration-150 transition-colors">
                Порахувати
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="w-full p-4 rounded-md border border-green-800 ">
            <h2 className="text-lg font-semibold mb-2 text-green-800">Результат підрахунку</h2>
            <p className="mb-2">
              До кінця терміну <strong className='text-green-800'>({months} пер.)</strong>, ваш внесок становитиме <strong className='text-green-800'>${result.finalAmount}</strong>,
              враховуючи загальний дохід <strong className='text-green-800'>${result.totalIncome}</strong>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-green-800 text-bold">
                    <th className="px-0.5 md:px-2 py-1">№</th>
                    <th className="px-0.5 md:px-2 py-1">Початок</th>
                    <th className="px-0.5 md:px-2 py-1">Дохід</th>
                    <th className="px-0.5 md:px-2 py-1">Довкладення</th>
                    <th className="px-0.5 md:px-2 py-1">Кінець</th>
                  </tr>
                </thead>
                <tbody>
                  {result.history.map((row) => (
                    <tr key={row.month}>
                      <td className="px-0.5 md:px-2 py-1 border-b border-gray-400">{row.month}</td>
                      <td className="px-0.5 md:px-2 py-1 border-b border-gray-400">${row.start}</td>
                      <td className="px-0.5 md:px-2 py-1 border-b border-gray-400">${row.income}</td>
                      <td className="px-0.5 md:px-2 py-1 border-b border-gray-400">${row.addition}</td>
                      <td className="px-0.5 md:px-2 py-1 border-b border-gray-400">${row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default App
