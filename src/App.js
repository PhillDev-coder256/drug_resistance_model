// import logo from './logo.svg';
import { useState } from 'react';
import React from 'react';
import './App.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

function App() {

  const [patientNames, setPatientNames] = useState('');
  const [admission, setAdmission] = useState('');
  const handlePatientNamesChange = (event) => {
    setPatientNames(event.target.value);
  };

  const handleAdmissionChange = (event) => {
    setAdmission(event.target.value);
  };


  // UPLOAD SEQUENCE FROM TEXT FILE
  const [fileContents, setFileContents] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [prediction, setPrediction] = useState();
  const fileInputRef = React.useRef(null);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      readFileContents(selectedFile);
    }
  };

  const readFileContents = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      setFileContents(contents);
      setInputValue(contents)
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // METHOD TO MAKE THE PREDICTION
  const handlePredictClick = async () => {
    const requestData = {
      // sequence: "PQITLWQRPLVTIKIGGQLKEALLDTGADDTVLEEMNLPGRWKPKMIGGIGGFIKVRQYDQILIEICGHKAIGTVLVGPTPVNIIGRNLLTQIGCTLNF"
      sequence: inputValue
    };

    try {
      const res = await axios.post('https://mallan.net/hiv_prediction', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("THE RESPONSE IS: ", res.data);
      setPrediction(res.data);
    } catch (error) {
      console.error("Error while predicting:", error);
    }
  };

  return (

    <div className="App">

      <div
        className="q-page-container"
        style={{ paddingTop: 30 }}
      >
        {/*[*/}
        <main style={{ minHeight: "none" }} data-v-b04ecca3="">
          <div>

            {/* HEADERS */}
            <div className='headers'>
              <h1 className="nero-h1 hide-gt-lg">HIV-ResistNet</h1>
              <h2 className="nero-h2 hide-gt-lg">Accurately predict HIV drug resistance profiles online using Artificial Intelligence.</h2>
            </div>

            {/* MAIN CONTENT */}
            <section>
              <div>

                {/*[*/}
                <div className='prection_result_row'>
                  <div className="InputArea" data-v-143d6e0d="">
                    <h2 className='headers'>INPUT PATIENTS DATA</h2>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="text"
                        placeholder="Patient Names"
                        className="inputothers"
                        value={patientNames}
                        onChange={handlePatientNamesChange}
                        style={{ marginRight: '10px' }}
                      />
                      <input
                        type="text"
                        placeholder="Admission"
                        className="inputothers"
                        value={admission}
                        onChange={handleAdmissionChange}
                      />
                    </div>


                    {/* UPLOAD SEQUENCE BUTTON */}
                    <button
                      className="upload-button"
                      onClick={handleButtonClick}
                    >
                      <FaUpload className="upload-icon" />
                      UPLOAD SEQUENCE
                    </button>

                    {/* INPUT SEQUENCE FIELD */}
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />

                    <p className="uploadArea__text">
                      -------------- OR ------------
                    </p>

                    <input
                      type='text'
                      placeholder='PLACE YOUR SEQUENCE HERE'
                      className='inputseguence'
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    <button
                      className="upload-button-predict"
                      onClick={handlePredictClick}
                    >
                      <FaUpload className="upload-icon" />
                      PREDICT RESISTANCE
                    </button>

                  </div>
                  <div className="ResultArea" data-v-143d6e0d="">
                    <h2 className='headers'>RESULTS</h2>
                    {prediction && <div>
                      <h1><b>RESULT:</b> {prediction?.resistance == 1 ? "THE SEQUENCE IS RESISTANT" : "THE SEQUENCE IS NOT RESISTANT"} </h1>
                    </div>
                    }
                  </div>
                </div>


              </div>
            </section>
          </div>
        </main>
      </div>
      <footer className='footer'>
        <p>TRAINED AND DEVELOPED BY ALLEN AND ESTHER</p>
      </footer>
    </div>
  );
}

export default App;
