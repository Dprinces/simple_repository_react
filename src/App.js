import React, { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSave = (item) => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...item, id: i.id } : i)));
      setEditingItem(null);
    } else {
      setItems([...items, { ...item, id: Date.now() }]);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDeleteSelected = () => {
    setItems(items.filter((item) => !item.selected));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <h1>Item Repository</h1>
      <ItemForm itemToEdit={editingItem} onSave={handleSave} onCancel={handleCancel} />
      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDeleteSelected={handleDeleteSelected}
      />
    </div>
  );
};

export default App;
