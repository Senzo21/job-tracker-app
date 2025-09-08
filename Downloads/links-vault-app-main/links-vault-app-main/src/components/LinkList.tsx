// src/components/LinkList.tsx
import React from 'react';
import { Link } from '../types';

interface LinkListProps {
  links: Link[];
  updateLink: (id: number, updatedLink: Link) => void;
  deleteLink: (id: number) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, updateLink, deleteLink }) => {
  return (
    <div>
      {links.map(link => (
        <div key={link.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{link.title}</h3>
          <p><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></p>
          <p>{link.description}</p>
          <p>Tags: {link.tags.join(', ')}</p>
          <button onClick={() => deleteLink(link.id)}>Delete</button>
          {/* You can add an inline edit form or modal for update */}
        </div>
      ))}
    </div>
  );
};

export default LinkList;
