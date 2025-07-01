import {
  Paper, Table, TableBody, TableCell,
  TableContainer,TableHead, TableRow
} from '@mui/material';
import { useState } from 'react';

type SummaryTableProps = {
  data: Record<string, (string | number)[]>;
};

export function SummaryTable({ data }: SummaryTableProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const renderCellValue = (value: unknown) => {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  };

  const handleEventClick = (index: number) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data)[0]?.map((_, index) => (
            <TableRow
              key={index}
              hover
              selected={selectedIndex === index}
              onClick={() => handleEventClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {Object.keys(data).map((key) => (
                <TableCell key={key}>
                  {renderCellValue(data[key][index])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
