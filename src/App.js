import logo from './logo.svg';
import React from "react";

import './App.css';

import { ThemeProvider } from '@aws-amplify/ui-react';
import FaceLiveness from './Components/FaceLiveness';
import ReferenceImage from './Components/ReferenceImage';
import CustomCredentialsProvider from './Components/CustomCredentialsProvider.ts';
import {
  View,
  Flex,
} from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';

import awsexports from './aws-exports';

// Amplify.configure(awsexports);

// Use 
const customCredentialsProvider = new CustomCredentialsProvider('ACCESS-KEY-TO-BE-REPLACE', 'SECRET-KEY-TO-BE-REPLACE',  'SESSION-TOKEN-TO-BE-REPLACE');
Amplify.configure(awsexports,
  {
    Auth: {
      // Supply the custom credentials provider to Amplify
      credentialsProvider: customCredentialsProvider
    }
  }
);

function App() {

  const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null)

  const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
    if (faceLivenessAnalysis !== null) {
      setFaceLivenessAnalysis(faceLivenessAnalysis)
    }
  }

  const tryagain = () => {
    setFaceLivenessAnalysis(null)
  }


  return (
    <ThemeProvider>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <View
          as="div"
          maxHeight="600px"
          height="600px"
          width="740px"
          maxWidth="740px"
        >
          {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
            <ReferenceImage faceLivenessAnalysis={faceLivenessAnalysis} tryagain={tryagain}></ReferenceImage>
          ) :
            (<FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />)}

        </View>
      </Flex>
    </ThemeProvider>

  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
