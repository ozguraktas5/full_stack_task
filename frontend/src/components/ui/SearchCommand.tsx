import React, { useState } from 'react';
import { Command, CommandInput } from './Command';
import { User } from '../../types';
import '../../styles/ui/Command.css';

interface SearchCommandProps {
  users: User[];
  onUserSelect?: (user: User) => void;
  placeholder?: string;
  className?: string;
}

const SearchCommand: React.FC<SearchCommandProps> = ({
  placeholder = "Kullanıcı ara...",
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState('');

  // Filtered users and handleUserSelect are not used in current implementation
  // but kept for future use

  return (
    <div className={`search-command ${className}`}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </Command>
    </div>
  );
};

export default SearchCommand;
