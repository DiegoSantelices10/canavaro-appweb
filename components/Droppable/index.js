import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable