import { InputLabel, MenuItem, Select } from "@mui/material";

export function FieldType(props) {
    return (
        <div>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Тип значения</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="value-type-select"
                value={props.selectedType}
                onChange={props.onChange}
            >
                <MenuItem value={'String'}>Строка</MenuItem>
                <MenuItem value={'Bool'}>Флаг</MenuItem>
                <MenuItem value={'Int'}>Целое число</MenuItem>
                <MenuItem value={'Float'}>Дробное число</MenuItem>
                <MenuItem value={'Enumeration'}>Выбор из нескольких значений</MenuItem>
            </Select>
        </div>
    );
}