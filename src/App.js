import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';




function App() {
  const numbers1 = "0123456789"
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
 const specialCharacters = "!'^+%&/()-?_#$%{[]}|;:>+`<.*-@";

  
  const [password1, setPassword1] = useState("");
  const [passwordlength, setPasswordLength] = useState(15);
  const [uppercase, setUpperCase] = useState(false);
  const [lowercase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false);
  const [iscopied, setCopy] = useState(false);
  console.log(password1)
  const successfully = "copied successfully"

  useEffect(
    (_) => {
      if (iscopied) {
        copiedSucess(successfully)
        setTimeout((_) => {
          setCopy(false);
          setPassword1("");
        }, 6000);
      }
    },
    [iscopied]
  );
  const copiedSucess = (e)=>{
    toast.success((e), {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }
  const copiedFailed =(e) =>{
    toast.error((e), {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

 


  const generatePassword = _ => {
    var characterList = '';
    if(!numbers && !symbols && !lowercase && !uppercase){
      copiedFailed("!generating password failed! you need to select minimum 1option")
    }

    if (numbers) {
      characterList = characterList + numbers1;
    }
    if (symbols) {
      characterList = characterList + specialCharacters;
    }
    if (lowercase) {
      characterList = characterList + lowerCaseLetters;
    }
    if (uppercase) {
      characterList = characterList + upperCaseLetters;
    }
    setPassword1(createPassword(characterList));

  }
  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length

    for (let i = 0; i <= passwordlength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }

    return password;

  }


  return (
    <div className="App">

      <Container className="container" sx={{ height: 600, width: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box className="box" sx={{ width: "70%", border: "1px solid rgba(0,0,0,1)", borderRadius: 1, height: "65%" }}>
          <Stack sx={{ padding: 1 }} >

            <h1>Password Generator</h1>


            <Stack direction="row" sx={{ border: "1px solid rgba(0,0,0,0.3)", borderRadius: 1 }} backgroundColor="rgba(128,128,128,0.4)" display="flex" justifyContent="space-between" alignItems="flex-end">


              <span style={{ fontSize: "100%", minHeight: 40, marginLeft: "2%", width: "80%", display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }} >{password1}</span>
              <CopyToClipboard text={password1} onCopy={(_) => setCopy(true)} >
                <FontAwesomeIcon className="clipboard" style={{ width: "5%", padding: 5, backgroundColor: `${iscopied === false ? "#138496" : "green"}`, height: "auto", borderRadius: 1 }} icon={faPaste} />
              </CopyToClipboard>
            </Stack>


          </Stack>
          <Stack direction="row" sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1, marginTop: 1, marginBottom: 3 }} display="flex" justifyContent="space-between">
            <label style={{ paddingLeft: 5 }} >select password_length</label>
            <input defaultValue={passwordlength} onChange={(e) => setPasswordLength(e.target.value)} type="number" name="password_length" min={10} max={20} />
          </Stack>
          <Stack direction="row" sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }}  >
            <input type="checkbox" onChange={e => setUpperCase(e.target.checked)} checked={uppercase} name="uppercase" />

            <label style={{ paddingLeft: 5 }} >Include uppercase Letters</label>
          </Stack>
          <Stack direction="row" sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }} >
            <input type="checkbox" onChange={(e) => setLowerCase(e.target.checked)} checked={lowercase} name="lowercase" />

            <label style={{ paddingLeft: 5 }} >Include Lower Case Letters</label>
          </Stack>
          <Stack direction="row" sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }} >
            <input type="checkbox" onChange={(e) => setNumbers(e.target.checked)} checked={numbers} name="numbers" />

            <label style={{ paddingLeft: 5 }} >Include Numbers</label>
          </Stack>
          <Stack direction="row" sx={{ fontWeight: 500, fontSize: "100%", paddingLeft: 1 }} >
            <input type="checkbox" onChange={(e) => setSymbols(e.target.checked)} checked={symbols} name="symbols" />

            <label style={{ paddingLeft: 5 }} >Inlcude Symbols</label>
          </Stack>
          <button className="button" onClick={generatePassword} style={{ width: "90%", cursor: "pointer", fontSize: "100%", padding: "1.5%", marginTop: "2.5%", backgroundColor: "#138496", color: "white", border: "white", outline: "2px solid #9dd7e1", outlineOffset: 0.5, borderRadius: 2 }} >Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

        </Box>



      </Container>

    </div>
  );
}

export default App;
