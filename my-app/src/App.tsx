import { useContext } from 'react';
import { DataContext } from './data-provider';
import { SummaryTable } from './custom_components/table';

const App = () => {
  const { tableData } = useContext(DataContext);
  const userData = tableData["users"];
  
  if (!userData) {
    return <div>Loading...</div>;
  }
  
  return <SummaryTable data={userData}/>
};


export default App;

