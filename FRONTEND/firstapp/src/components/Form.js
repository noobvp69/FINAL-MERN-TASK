import {useState} from "react";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
function Form() {
    const  [name,setName] = useState('');
    const  [age,setAge] = useState('');
    const  [gender,setGender] = useState('');
    const  [district,setDistrict] = useState('');
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/students',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name,age,gender,district})
            }) 
            if(!response.ok){
                throw new Error('Network response was not ok')
            }

            const data = await response.json();
            alert("Data inserted successfully!");
            console.log(data);

            setName('');
            setAge('');
            setGender('');
            setDistrict('');
        }catch(error){
            alert("Data insertion failed!");
        }

    };


  return <form  onSubmit={handleSubmit}>
   
  <div className="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Enter your name"value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
  </div>
  <div className="form-group">
    <label for="inputAddress2">Age</label>
    <input type="number" class="form-control" id="inputAge" placeholder="your age" value={age}
            onChange={(e) => setAge(e.target.value)}required/>
  </div>
  <div className="form-row">
  <div className="form-check form-check-inline" required>
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"  value="Male"
            onChange={(e) => setGender(e.target.value) } required/>
  <label className="form-check-label" for="inlineRadio1">Male</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"  value="Female"
            onChange={(e) => setGender(e.target.value)} required/>
  <label className="form-check-label" for="inlineRadio2">Female</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"  value="Other"
            onChange={(e) => setGender(e.target.value)} required/>
  <label className="form-check-label" for="inlineRadio3">Other</label>
</div>

    <div className="form-group col-md-4">
      <label for="inputState" >District</label>
      <select id="inputState" class="form-control" value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required>
        <option >Choose...</option>
        <option>Kasargod</option>
        <option>Kannur</option>
        <option>Kozhikode</option>
        <option>Malappuram</option>
        <option>Kollam</option>
        <option>Thiruvananthapuram</option>
      </select>
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  
}

export default Form