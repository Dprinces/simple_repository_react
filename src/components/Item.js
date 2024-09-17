import React from 'react';
import styles from './Item.module.css';

const Item = ({ item, onDelete, onEdit }) => {
  const { picture, name, category } = item;

  // Function to create an object URL for file preview
  const getPreviewUrl = (file) => {
    if (file && file instanceof File) {
      return URL.createObjectURL(file);
    }
    return ''; // Return empty string if invalid
  };

  // Preview URL (assuming 'picture' can be a File object)
  const previewUrl = getPreviewUrl(picture);

  return (
    <li className={styles.itemContainer}>
      {previewUrl && (
        <img src={previewUrl} alt={name} className={styles.itemImage} />
      )}
      <div className={styles.itemDetails}>
        <h3>{name}</h3>
        <p>Category: {category}</p>
      </div>
      <button onClick={() => onEdit(item)} className={styles.editButton}>
        Edit
      </button>
      <button onClick={() => onDelete(item.id)} className={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default Item;
