
import './App.css';
import React, { useState } from "react";
import {Box,Stack,Select,Text, Button,Heading,Textarea} from "@chakra-ui/react"
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
let baseUrl = "http://localhost:4000"

function App() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);
  const [input, setInput]=useState("")
  const [result,setResult] =useState( `
  # Hello, Markdown!

  This is a **bold** text.

  - List item 1
  - List item 2
  `);
  return (
    <div  className="App">
      {/* <Heading mb={10}>Code Converter</Heading> */}
      <Box width={"100%"} display="flex" flexDir="row" alignItems={"center"} 
      justifyContent={'space-evenly'} padding="40px" borderRadius={"5px"} height="50px"
       backgroundColor={"#9F7AEA"} >
       
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
      >

      <option backgroundColor="red" value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
      </Select>
    </Box>

        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} >Convert</Button>
        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} >Debug</Button>
        <Button bgColor={"#322659"}    _hover={{ backgroundColor: '#322659', color:"#fff" }} color={"#E9D8FD"} >Quality Check</Button>
      </Box>
      
      <Box borderBottomRadius={"5px"} width={"100%"} display={"flex"} justifyContent={"space-between"} 
       height={"95%"} backgroundColor={"#"}>
        <Box backgroundColor={"#282c34"} display="flex" justifyContent="center"
         alignItems="center" width={"50%"} borderRadius={"5px"} mt={3}>
        
        <CodeMirror

        className='codeMirror'
        value="console.log('hello world!');"
        height="100%"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    
        </Box>
        
        
        <Box backgroundColor={"#E9D8FD"} padding={8} width={"49%"} borderRadius={"5px"} mt={3}>
     
       
        <ReactMarkdown className='markDown' renderers={{code:Component}} >
          {result}
        </ReactMarkdown>






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
