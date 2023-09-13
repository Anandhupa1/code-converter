
import './App.css';
import React, { useEffect, useState } from "react";
import {Box,Spinner,Stack,Select,Text, Button,Heading,Textarea, flattenTokens} from "@chakra-ui/react"
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
let baseUrl = "https://good-puce-crow-yoke.cyclic.app"

function App() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setInput(value)
  }, []);
  const [input, setInput]=useState("");
  const [result,setResult] =useState("");
  const [language,setLanguage] =useState("any")
  const [load,setLoad] =useState(false);
  async function fetchAndUpdate(obj={},route="convert"){
  try {
    setLoad(true)
    let res  = await fetch(`${baseUrl}/${route}`, {
      method: 'POST',
      body: JSON.stringify(
        obj
      ),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    let data = await res.json();
    

    setResult(data.content)
    setLoad(false)
  } catch (error) {
    alert(error)
  }
  }





  return (
    <div  className="App">
      {/* <Heading mb={10}>Code Converter</Heading> */}
      <Box width={"100%"} display="flex" flexDir="row" alignItems={"center"} 
      justifyContent={'space-between'} padding="40px" borderRadius={"5px"} height="50px"
       backgroundColor={"#9F7AEA"} >
      <Box>
      <Heading>CodeCraft </Heading>
      
      </Box>
      
        <Box width="200px" height="40px" backgroundColor="#322659" borderRadius="md" position="relative">
      <Select
        bg={"#322659"}
        width="100%"
        height="100%"
        backgroundColor="#322659"
        border="none"
        borderRadius="md"
        
        py="2"
        color="#E9D8FD"
        _hover={{ backgroundColor: '#322659', color:"#000" }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        cursor={"pointer"}
        onChange={(e)=>{
          setLanguage(e.target.value);
          
        }}
      >

      <option backgroundColor="Python" value='python'>Python</option>
      <option value='Javascript'>javascript</option>
      <option value='Java'>Java</option>
      <option value='C'>C</option>
      </Select>
    </Box>

        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} 
        onClick={()=>{
          let obj = {code:input,language};
          fetchAndUpdate(obj,"convert")
        }}
        >Convert</Button>
        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} 
         onClick={()=>{
          let obj = {code:input};
          fetchAndUpdate(obj,"debug")
        }}
        >Debug</Button>
        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} 
         onClick={()=>{
          let obj = {code:input};
          fetchAndUpdate(obj,"quality")
        }}
        >Quality Check</Button>
      </Box>
      
      <Box borderBottomRadius={"5px"} width={"100%"} display={"flex"} justifyContent={"space-between"} 
        
       height={"95%"} backgroundColor={"#"}>
        <Box backgroundColor={"#282c34"} display="flex" justifyContent="center"
         alignItems="center" width={"50%"} borderRadius={"5px"} mt={3}>
        
        <CodeMirror

        className='codeMirror'
        value="//enter your code here"
        height="100%"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    
        </Box>
        
        
        <Box backgroundColor={"#E9D8FD"} padding={8} width={"49%"} borderRadius={"5px"}
         mt={3} display="flex" alignItems="center" justifyContent="center">
     
       {load?
       <Spinner
       thickness='4px'
       speed='0.65s'
       emptyColor='#B794F4'
       color='#44337A'
       size='xl'
     />
       :
         <ReactMarkdown className='markDown' renderers={{code:Component}} >
         {result}
       </ReactMarkdown>
       }
      






        </Box>
      </Box>


    </div>
  );
}

const Component = ({value,language}) => {
 
  return (
    <SyntaxHighlighter language={language??""} style={docco}>
      {value??""}
    </SyntaxHighlighter>
  );
};



export default App;
