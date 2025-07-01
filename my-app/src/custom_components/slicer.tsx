import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type comboBoxProps = {
  label: string;
options: string[];
};

export function ComboBox({label, options} : comboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}