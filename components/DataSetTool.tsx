'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, X, Edit2 } from 'lucide-react';

    const initialCategories = {
        'Behavioral Tracking': [
          { id: '1', name: 'Mouse Movement Patterns', color: 'green' },
          { id: '2', name: 'Scroll Behavior', color: 'green' },
          { id: '3', name: 'Time Spent per Post', color: 'green' },
          { id: '4', name: 'Interaction Frequency', color: 'green' },
          { id: '5', name: 'Content Hover Time', color: 'green' },
          { id: '6', name: 'Click Patterns', color: 'green' },
          { id: '7', name: 'Video Watch Duration', color: 'green' },
          { id: '8', name: 'Engagement Times', color: 'green' },
        ],
        'Personal Information': [
          { id: '10', name: 'Location History', color: 'green' },
          { id: '11', name: 'Device Information', color: 'green' },
          { id: '12', name: 'Contact Lists', color: 'green' },
          { id: '13', name: 'Search History', color: 'green' },
          { id: '14', name: 'Browser Type', color: 'green' },
          { id: '15', name: 'IP Address', color: 'green' },
          { id: '16', name: 'Connected Accounts', color: 'green' },
          { id: '17', name: 'Email Contacts', color: 'green' },
        ],
        'Content Analysis': [
          { id: '19', name: 'Message Sentiment', color: 'green' },
          { id: '20', name: 'Photo Content', color: 'green' },
          { id: '21', name: 'Shared Links', color: 'green' },
          { id: '22', name: 'Comment Topics', color: 'green' },
          { id: '23', name: 'Profile Keywords', color: 'green' },
          { id: '24', name: 'Post Frequency', color: 'green' },
          { id: '25', name: 'Media Preferences', color: 'green' },
          { id: '26', name: 'Language Usage', color: 'green' },
        ]
      };

const colors = ['green', 'orange', 'red'];

const DataCategorizationApp = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;
    
    const newCategories = { ...categories };
    const [movedItem] = newCategories[sourceCategory].splice(source.index, 1);
    newCategories[destCategory].splice(destination.index, 0, movedItem);
    
    setCategories(newCategories);
  };

  const cycleColor = (categoryName, itemId) => {
    const newCategories = { ...categories };
    const category = newCategories[categoryName];
    const itemIndex = category.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const currentColor = category[itemIndex].color;
      const nextColorIndex = (colors.indexOf(currentColor) + 1) % colors.length;
      category[itemIndex] = { ...category[itemIndex], color: colors[nextColorIndex] };
      setCategories(newCategories);
    }
  };

  const handleDeleteItem = (categoryName, itemId) => {
    const newCategories = { ...categories };
    newCategories[categoryName] = newCategories[categoryName].filter(
      item => item.id !== itemId
    );
    setCategories(newCategories);
  };

  const handleItemNameEdit = (categoryName, itemId, newName) => {
    const newCategories = { ...categories };
    const category = newCategories[categoryName];
    const itemIndex = category.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      category[itemIndex] = { ...category[itemIndex], name: newName };
      setCategories(newCategories);
    }
    setEditingItem(null);
  };

  const addNewCategory = () => {
    const newCategoryName = `Category ${Object.keys(categories).length + 1}`;
    setCategories({
      ...categories,
      [newCategoryName]: []
    });
  };

  const addNewItem = (categoryName) => {
    const newCategories = { ...categories };
    const newId = Math.random().toString(36).substr(2, 9);
    newCategories[categoryName].push({
      id: newId,
      name: 'New Item',  // Changed default name
      color: 'green'
    });
    setEditingItem(newId);  // Automatically enter edit mode for new items
    setCategories(newCategories);
  };

  const handleCategoryNameEdit = (oldName, newName) => {
    if (oldName === newName || newName.trim() === '') {
      setEditingCategory(null);
      return;
    }
    const newCategories = { ...categories };
    newCategories[newName] = newCategories[oldName];
    delete newCategories[oldName];
    setCategories(newCategories);
    setEditingCategory(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm text-custom-green mb-2">Alternative Data Set</h1>
        <button
          onClick={addNewCategory}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categories).map(([categoryName, items]) => (
            <div key={categoryName}>
              {editingCategory === categoryName ? (
                <input
                  className="w-full p-2 border mb-4"
                  defaultValue={categoryName}
                  onBlur={(e) => handleCategoryNameEdit(categoryName, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCategoryNameEdit(categoryName, e.target.value);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <div className="text-sm text-gray-400 mb-4 cursor-pointer" onClick={() => setEditingCategory(categoryName)}>
                  {categoryName}
                </div>
              )}
              
              <Droppable droppableId={categoryName}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-3 gap-2"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative"
                          >
<div
  className={`w-full aspect-square border p-2 relative 
    ${item.color === 'green' ? 'border-custom-green' : 
      item.color === 'orange' ? 'border-orange-500' : 'border-red-500'}`}
>
  <div 
    className={`w-full h-full flex flex-col items-center justify-center ${
      item.color === 'green' ? 'text-custom-green' : 
      item.color === 'orange' ? 'text-orange-500' : 'text-red-500'
    }`}
  >
    <div 
      className="w-2/3 cursor-pointer mb-2" 
      onClick={() => cycleColor(categoryName, item.id)}
    >
<svg viewBox="0 0 100 100">
  <polygon
    points="50,10 90,40 80,90 20,90 10,40 50,10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  />
</svg>
    </div>
    <div className="relative w-full text-center">
      {editingItem === item.id ? (
        <input
          className="w-full text-sm p-1 border text-black bg-white text-center"
          defaultValue={item.name}
          onBlur={(e) => handleItemNameEdit(categoryName, item.id, e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleItemNameEdit(categoryName, item.id, e.target.value);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      ) : (
        <div className="flex items-center justify-center gap-1">
          <div 
            className="text-center text-sm truncate cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setEditingItem(item.id);
            }}
          >
            {item.name}
          </div>
          <Edit2 
            className="w-3 h-3 text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setEditingItem(item.id);
            }}
          />
        </div>
      )}
    </div>
  </div>
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteItem(categoryName, item.id);
    }}
    className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
  >
    <X className="w-4 h-4" />
  </button>
</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button
                      onClick={() => addNewItem(categoryName)}
                      className="w-full aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Plus className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DataCategorizationApp;