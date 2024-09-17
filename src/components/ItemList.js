import React from 'react';
import Item from './Item';
import styles from './ItemList.module.css';

const ItemList = ({ items, onDelete, onEdit, onDeleteSelected }) => {
  return (
    <div className={styles.container}>
      <button onClick={onDeleteSelected} className={styles.deleteButton}>
        Delete Selected
      </button>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.itemListItem}>
            <Item item={item} onDelete={onDelete} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
