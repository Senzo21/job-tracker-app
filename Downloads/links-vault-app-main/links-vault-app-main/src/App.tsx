import React, { useState, useEffect } from 'react';
import LinkForm from './components/LinkForm';
import LinkList from './components/LinkList';
import SearchBar from './components/SearchBar';
import { Link } from './types';

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load links from localStorage on mount
  useEffect(() => {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const addLink = (title: string, url: string, description: string, tags: string[]) => {
    const newLink: Link = {
      id: Date.now(),
      title,
      url,
      description,
      tags
    };
    setLinks(prev => [...prev, newLink]);
  };

  const updateLink = (id: number, updatedLink: Link) => {
    setLinks(prev => prev.map(link => (link.id === id ? updatedLink : link)));
  };

  const deleteLink = (id: number) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1>Links Vault</h1>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      <LinkForm addLink={addLink} />
      <LinkList links={filteredLinks} updateLink={updateLink} deleteLink={deleteLink} />
    </div>
  );
};

export default App;
