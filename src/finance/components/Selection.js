import {useState,useEffect} from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Selection ({category,value,setCategory}){
    // const [value,setValue] = useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return(
        <Box sx={{ width: '15%' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Category"
                        onChange={handleChange}
                    >
                    {category.map((categoryValue)=><MenuItem key={categoryValue} value={categoryValue}>{categoryValue}</MenuItem>)}
                    </Select>
                </FormControl>
        </Box>
    );
}

export default Selection;