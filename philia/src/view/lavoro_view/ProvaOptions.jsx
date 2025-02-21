import React, { useState } from 'react';

const ProvaOptions = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digita qualcosa..."
        rows="4"
        cols="50"
      />
      <div>
        {filteredOptions.map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>
    </div>
  );
};

export default ProvaOptions;
