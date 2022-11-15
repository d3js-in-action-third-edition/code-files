import Charts from './Charts/Charts';

function App() {
  return (
    <div className="container">
      {loading && <div>Loading...</div>}
      {!loading && <Charts />}
    </div>
  );
}

export default App;
