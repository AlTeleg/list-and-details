import './App.css';
import { useState } from 'react';
import List from './components/List';
import Details from './components/Details';
import { Info } from './components/Details';

const DATA = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/';

function App() {
  const [selectedInfo, setSelectedInfo] = useState<Info | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  return (
    <>
      <List data={DATA} setSelectedInfo={setSelectedInfo} setIsDetailsVisible={setIsDetailsVisible}/>
      <Details data={DATA} info={selectedInfo} isVisible={isDetailsVisible}/>
    </>
  );
}

export default App;
