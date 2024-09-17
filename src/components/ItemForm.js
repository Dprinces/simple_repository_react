import React, { useState, useEffect } from 'react';
import styles from './ItemForm.module.css';

const categories = ['Car', 'Color', 'Phone', 'Shoe'];

const ItemForm = ({ itemToEdit, onSave, onCancel }) => {
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setCategory(itemToEdit.category);
      setItemId(itemToEdit.id);

      if (itemToEdit.picture) {
        setPreview(itemToEdit.picture); // If it's a URL, use it directly
      }
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (picture) {
      formData.append('picture', picture);
    }
    formData.append('name', name);
    formData.append('category', category);
    formData.append('id', itemId);

    onSave(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result); // Set preview URL
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  return (
    <form id="itemForm" method="POST" onSubmit={handleSubmit} className={styles.formContainer}>
      <label htmlFor="picture" className={styles.formLabel}>
        Picture:
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.formInput}
        />
      </label>
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
        </div>
      )}
      <label htmlFor="name" className={styles.formLabel}>
        Name:
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className={styles.formInput}
        />
      </label>
      <label htmlFor="category" className={styles.formLabel}>
        Category:
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className={styles.formInput}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <input type="hidden" id="itemId" value={itemId} />

      <button type="submit" className={`${styles.button} ${styles.saveButton}`}>Save</button>
      <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
    </form>
  );
};

export default ItemForm;
