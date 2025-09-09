import React, { useState, useMemo } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './Command';
import { User } from '../../types';
import '../../styles/ui/Command.css';

interface SearchCommandProps {
  users: User[];
  onUserSelect?: (user: User) => void;
  placeholder?: string;
  className?: string;
}

const SearchCommand: React.FC<SearchCommandProps> = ({
  users,
  onUserSelect,
  placeholder = "Kullanıcı ara...",
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchValue.trim()) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [users, searchValue]);

  const handleUserSelect = (user: User) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
    setSearchValue('');
  };

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
