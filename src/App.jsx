import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Components/mainpage/mainpage';

const queryClient = new QueryClient();

function App() {
  

  return (      
    <div className="App">   
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </div>
  )
}

export default App
