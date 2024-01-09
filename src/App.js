import {useState} from 'react';
import axios from "axios"
import './App.css';

const baseUrl = "http://0.0.0.0:80"

function App() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${baseUrl}/api`, {name});
      setResult(response.data.name);
      setFormSubmitted(true);
      setNewSubmission(true);
      setUserTyping(false);
    } catch (error){
      console.error(error)
    }
  };

  const handleReset = () => {
    setName('');
    setResult('');
    setFormSubmitted(false);
    setNewSubmission(false);
    setUserTyping(false);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    setUserTyping(true);
  };

  const handleResult = () => {
    if (!formSubmitted || !name || !newSubmission || userTyping) {
      return null;
    } else if (!/^[a-zA-ZÀ-ÿ- ]+$/.test(name)) {
      return (
        <div class="box1 sb7">Please enter an alphabetic name</div>
        );
    } else {
      return (
      <>  
      <div class="box1 sb7">{name} is {result}</div>
      <p class="disclaimer">
        This app utilizes machine learning algorithms to analyze last names and provide democraphic predictions. This app is intended for information purposes only. It is important to note that predicting race or ethnicity based on names can be inherently biased and perpetuate stereotypes. The predictions made by this app are based on historical data and may not accurately reflect an indivisual's identity or background.</p></>
    );
  }
};


  return (
    <div class="Wrapper">
     <section>
      <h1>Enter a last name to predict its ethnic origin!</h1>
        <ul>
          <form onSubmit = {handleSubmit} style={{textAlign: 'center'}} class="Input">
              <input
                type = "text"
                name = "name"
                placeholder = "Type a last name"
                value = {name}
                onChange={handleInputChange}
                class="Input-text" 
              />
             {/*<button type ="submit" style ={{ marginLeft: '8px', marginRight: '8px'}}> */}
             

            {/*<button type ="submit" style ={{ marginLeft: '8px', marginRight: '8px'} */}
          <div className="buttons-container">
            <button class="button-74"> Submit </button>
            <button class="button-74" onClick={handleReset}>Reset</button>
          </div>  
            </form>
            {handleResult()}
          </ul>
      </section>
  </div>
  );
}

export default App;
