import React from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import './index.css';
import { CurrencyOption } from '../../types/common';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CurrencyOption[];
}

const CurrencySelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <div >
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="select-display">
          <img
            src={options.find((option) => option.value === value)?.logo}
            alt={value}
            className="select-logo"
          />
          <span>{options.find((option) => option.value === value)?.label}</span>
          <ChevronDownIcon className='size-4 ml-1'/>
        </ListboxButton>
        <ListboxOptions className="select-options w-[var(--button-width)] transition duration-200 ease-in-out data-[leave]:data-[closed]:opacity-0" anchor="bottom" transition>
          {options.map((option) => (
            <ListboxOption key={option.value} value={option.value} as={React.Fragment}>
              {({ active, selected }) => (
                <div
                  className={`select-option ${active ? 'select-option-active' : ''} ${
                    selected ? 'select-option-selected' : ''
                  }`}
                >
                  <img src={option.logo} alt={option.label} className="select-logo" />
                  <span>{option.label}</span>
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default CurrencySelect;