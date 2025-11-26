import { useState, useEffect } from 'react';
import './App.css';

interface FunFact {
  text: string;
}

function App() {
  const [facts, setFacts] = useState<FunFact[]>([]);
  const [currentFact, setCurrentFact] = useState<string>('');

  useEffect(() => {
    fetch('/funfacts.json')
      .then(res => res.json())
      .then((data) => {
        console.log('Loaded facts:', data);
        setFacts(data.funFacts);
        if (data.funFacts.length > 0) setCurrentFact(data.funFacts[0].text);
      })
      .catch(err => console.error('Error loading fun facts:', err));
  }, []);

  useEffect(() => {
    console.log('facts state changed:', facts);
    if (!facts.length) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      console.log('New index:', randomIndex);
      setCurrentFact(facts[randomIndex].text);
    }, 2000);

    return () => clearInterval(interval);
  }, [facts]);

  return (
    <div className="app-container">
      <h1>Random Fun Fact Viewer</h1>
      <p className="fun-fact">{currentFact}</p>
    </div>
  );
}

export default App;
