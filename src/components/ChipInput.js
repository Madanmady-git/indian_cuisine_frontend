import React, { useState } from 'react';
import './ChipInput.scss';

const ChipInput = ({chips, setChips}) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            if (inputValue.trim() !== '') {
                setChips([...chips, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleDeleteChip = (chipToDelete) => {
        setChips(chips.filter(chip => chip !== chipToDelete));
    };

    return (
        <div className="chip-input-container">
            <div className="chip-list">
                {chips.map((chip, index) => (
                    <div key={index} className="chip">
                        <p>{chip}</p>
                        <button className="chip-delete" onClick={() => handleDeleteChip(chip)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter or comma"
                className="chip-input-field"
            />
        </div>
    );
};

export default ChipInput;
