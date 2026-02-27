import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import SortableItem from "components/SortableItem";

const OrderList = (props) => {
  const { items, onOrderChange } = props;


  const [people, setPeople] = useState(items || []);

  // Sincroniza el estado con las props cuando items cambie
  useEffect(() => {
    setPeople(items || []);
  }, [items]);



  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active.id !== over.id) {
      setPeople((people) => {
        const oldIndex = people.findIndex((person) => person.id === active.id);
        const newIndex = people.findIndex((person) => person.id === over.id);

        onOrderChange(arrayMove(people, oldIndex, newIndex))
        return arrayMove(people, oldIndex, newIndex);
      });
    }

  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={people}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 w-full">
            {people?.map((user, index) => (
              <div key={user.id} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-2xl font-black text-sm shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-110">
                  {index + 1}
                </div>
                <SortableItem user={user} />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default OrderList;