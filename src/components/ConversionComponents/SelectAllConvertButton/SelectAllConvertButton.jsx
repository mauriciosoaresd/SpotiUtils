import React from 'react'

const SelectAllConvertButton = ({toggleAll, totalSelected, list}) => {
    return (
        <button className={`conversionButton`}onClick={() => toggleAll()}>
            {totalSelected == list ? 'Deselect All' : 'Select All'} {totalSelected != 0 && `(${totalSelected})`}
        </button>
    )
}

export default SelectAllConvertButton;