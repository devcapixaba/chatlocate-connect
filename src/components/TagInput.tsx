
import { useState, useRef, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagInput = ({
  tags,
  setTags,
  placeholder = 'Adicionar tag...',
  maxTags = 10
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag: string) => {
    tag = tag.trim();
    if (!tag) return;
    
    // Verificar se a tag já existe
    if (tags.includes(tag)) return;
    
    // Verificar limite de tags
    if (tags.length >= maxTags) return;
    
    setTags([...tags, tag]);
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remover última tag ao pressionar backspace com input vazio
      removeTag(tags.length - 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-transparent min-h-10"
      onClick={handleContainerClick}
    >
      {tags.map((tag, index) => (
        <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          {tag}
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="ml-1 hover:text-yellow-900"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-grow min-w-20 border-none focus-visible:ring-0 p-0 h-7"
      />
    </div>
  );
};
