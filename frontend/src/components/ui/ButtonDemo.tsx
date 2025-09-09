import React from 'react';
import { Button } from './Button';
import { EyeIcon, EditIcon, TrashIcon, PlusIcon } from './Icons';

const ButtonDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Button Variants</h2>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <h3>Sizes</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon"><PlusIcon /></Button>
      </div>

      <h3>With Icons</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="default">
          <EyeIcon size={16} />
          View Posts
        </Button>
        <Button variant="default">
          <EditIcon size={16} />
          Edit
        </Button>
        <Button variant="destructive">
          <TrashIcon size={16} />
          Delete
        </Button>
      </div>

      <h3>Loading State</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button loading>Loading...</Button>
        <Button variant="destructive" loading>Deleting...</Button>
      </div>

      <h3>Disabled State</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button disabled>Disabled</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </div>
    </div>
  );
};

export default ButtonDemo;
