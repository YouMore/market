import React from "react";

const Select = ({options, defaultOption, value, onChange}) =>{
    return(
        <select 
            value={value} 
            onChange= {event => {onChange(event.target.value)}}
        >
            <option value="..." disabled>{defaultOption}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select