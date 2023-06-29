import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from 'react'
import { useState } from 'react'


// react beautifull dnd の機能

const grid = 4;

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  display: "flex",
  // flexDirection: "column",
  // flexWrap: "wrap",
  // whitespace: "nowrap",
  // overflowx: "scroll",
  // width: "300px",
  // overflow: "hidden",


})

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid,
  margin: `0, 0, 0, 0`,
  background: isDragging ? "#D059FF" : "#F6FFF2",
  width: "100px",
  // overflow: "hidden",
  border: "1px solid #000000",


  ...draggableStyle

})


function GeneratePrompt({items, handleSetPrompts}) {

 return (
     <Droppable droppableId="droppable" direction="horizontal" type="list">
         {(provided, snapshot) => (
             <div ref={provided.innerRef}
             style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <div style={{}}>
                        <div style={{overflow: "hidden"}}>{item.content}</div>
                        <button
                          style={{background: "white", padding: "2px", border: "1px solid black"}}
                          type="button"
                          onClick={() => {
                            const newItems = [...items];
                            newItems.splice(index, 1);
                            handleSetPrompts(
                              newItems
                            );
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            )}
    </Droppable>
    );
}
export default GeneratePrompt;
