/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react"
import { useUser } from "@clerk/clerk-react"
import { FinancialRecordProvider } from "../../context/financial-record-context"
 
const RecordForm = () => {

 const [description, setDescription] = useState()
 const [amount, setAmount] = useState("")
 const [category, setCategory] = useState("")
 const [paymentMethod, setPaymentMethod] = useState("")
 const { records, addRecord } = useContext(FinancialRecordProvider)

 const handleSubmit = (e) => {
  e.preventDefault()

  const { user } = useUser()

   const newRecord = {
   userId: user.id ?? "",
   date: new Date(),
   description: description,
   amount: amount,
   category: category,
   paymentMethod: paymentMethod
 };

 addRecord(newRecord)
 setDescription("")
 setAmount("")
 setCategory("")
 setPaymentMethod("") 

 }

  return (
    <div className="form-container">
     <form onSubmit={handleSubmit}>
      <div className="form-field">
       <label htmlFor="">Description: </label>
       <input type="text" required className="input" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="form-field">
       <label htmlFor="">Amount:</label>
       <input type="number" required className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="form-field">
       <label htmlFor="">Category:</label>
       <select name="" className="input" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Salary">Salary</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
       </select>
      </div>
      <div className="form-field">
       <label htmlFor="">Select a Payment Method</label>
       <select className="input" required name="" id="" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value=""></option>
        <option value="Credit Card">Credit Card</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
       </select>
      </div> 
      <button type="submit" className="button">
       Add Record
      </button>
      </form>
    </div>
  )
}

export default RecordForm