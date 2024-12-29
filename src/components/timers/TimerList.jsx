import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TimerList.css';

const TimerList = ({ timers, onReorder, onRemove }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    onReorder(sourceIndex, destinationIndex);
  };

  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="timers">
        {(provided) => (
          <div
            className="timer-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {timers.map((timer, index) => (
              <Draggable
                key={`${timer.title}-${index}`}
                draggableId={`${timer.title}-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`timer-item ${
                      snapshot.isDragging ? 'dragging' : ''
                    }`}
                  >
                    <div className="timer-header">
                      <div
                        className="drag-handle"
                        {...provided.dragHandleProps}
                      >
                        ⋮⋮
                      </div>
                      <div className="timer-title">{timer.title}</div>
                      <div className="timer-actions">
                        <button
                          className="remove-button"
                          onClick={() => onRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {timer.component}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TimerList;