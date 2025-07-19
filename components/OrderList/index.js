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

        console.log(arrayMove(people, oldIndex, newIndex));
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
          <div className="space-y-8 w-full">
            {people?.map((user, index) => (
              <div key={user.id} className="flex gap-4">
                <div className="shadow rounded-md bg-gray-50 p-4 w-12 text-center font-poppins">{index + 1}</div>
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