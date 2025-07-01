import React, { createContext, useState, useEffect } from 'react';

type Filter = [string, [string | number]];
type TableData = Record<string, (string | number)[]>;
type DataContextType = {
  tableData: Record<string, TableData>;
  filters: Record<string, Record<string, Filter>>;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, Filter>>>
  >;
};

export const DataContext = createContext<DataContextType>({
  tableData: {},
  filters: {},
  setFilters: () => {},
});

export const DataProvider = ({children, url}: {children: React.ReactNode; url: string;}) => {
    const [filters, setFilters] = useState<Record<string, Record<string, Filter>>>({});
    const [tableData, setTableData] = useState<Record<string, TableData>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log("Fetched data:", data);
                setTableData(data);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
      <DataContext.Provider value={{ tableData, filters, setFilters }}>
        {children}
      </DataContext.Provider>
    );
};
