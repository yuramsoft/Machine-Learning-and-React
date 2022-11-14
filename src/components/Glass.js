import './Glass.css'
import { useState } from 'react'
import axios from 'axios'

function Glass() {
  const [income, setIncome] = useState('')
  const [house_age, setAge] = useState('')
  const [rooms, setRooms] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [occupants, setOccupants] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { income, house_age, rooms, bedrooms, occupants }

    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
       // const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
        const msg = `Prediction: ${data.prediction}\nParameters: ${parameters}`
        alert(msg)
        reset()
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  const reset = () => {
    setIncome('')
    setAge('')
    setRooms('')
    setBedrooms('')
    setOccupants('')
  }

  return (
    <div className="glass">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4>Califonia House Value Prediction</h4>
        <div className="glass__form__group">
          <input
            id="income"
            className="glass__form__input"
            placeholder="Enter Average Income"
            required
            autoFocus
            min=""
            max=""
            pattern="[0-9]+([\.,][0-9]+)?"
            title=""
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="house_age"
            className="glass__form__input"
            placeholder="Enter House Age"
            required
            min=""
            max=""
            type="number"
            title=""
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={house_age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="rooms"
            className="glass__form__input"
            placeholder="Enter number of rooms"
            required
            min=""
            max=""
            type="number"
            title=""
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bedrooms"
            className="glass__form__input"
            placeholder="Enter number of Bedrooms"
            required
            min=""
            max=""
            type="number"
            title=""
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="occupants"
            className="glass__form__input"
            placeholder="Enter number of occupants"
            required
            min=""
            max=""
            type="number"
            title=""
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={occupants}
            onChange={(e) => setOccupants(e.target.value)}
          />
        </div>

       

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Glass