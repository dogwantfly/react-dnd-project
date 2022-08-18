import { useState, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import update from 'immutability-helper'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from "../../Constants";
import '../../index.css';

function Card({index, data, isDragging}) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className={`company rounded-[36px] ${isOpen ? 'bg-dark-green-custom' : 'bg-dark/60'} ${isDragging ? "opacity-0" : ''}`}  >
    <div className="py-5 px-10 grid xl:grid-cols-3 xl:justify-between xl:items-center gap-y-4">
      <h2 className="text-4xl">
        {data.name}
      </h2>
      <ul className="grid grid-cols-3 justify-between xl:gap-x-8 overflow-x-auto whitespace-nowrap">
        <li className="font-light sm:text-3xl text-xl">$56 M</li>
        <li className="font-light sm:text-3xl text-xl">159.6%</li>
        <li className="sm:text-3xl text-xl text-fill-transparent font-bold bg-clip-text bg-blue-gradient">$2.569</li>
      </ul>
      <div className="flex gap-4 xl:justify-end flex-wrap items-center">
        <a href="tel:+12345678" className="whitespace-nowrap bg-blue-gradient md:py-6 py-3 px-8 md:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80">
          聯繫公司
        </a>
        <button type="button" className="bg-dark rounded-3xl block  hover:opacity-80" onClick={() => { setIsOpen(!isOpen) }}>
          <div className={`material-icons transition-all md:text-7xl text-4xl ${isOpen ? 'rotate-180' : ''}`}>arrow_drop_up</div>
        </button>
      </div>
    </div>
    <div className={`form text-white p-0 max-h-0 overflow-hidden transition-all rounded-b-[36px] ${isOpen ? 'max-h-full py-9 px-10' : 'max-h-0 overflow-hidden p-0'}`}>
      <form action="" className="">
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="relative mb-3">
            <input type="text" className="border rounded-lg border-white bg-transparent p-2 w-full" id="liquidity" placeholder="..."/>
            <label htmlFor="liquidity" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">liquidity</label>
          </div>

          <div className="relative mb-3">
            <input type="text" className="border rounded-lg border-white bg-transparent p-2 w-full" id="earned" placeholder="..."/>
            <label htmlFor="earned" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">earned</label>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="whitespace-nowrap bg-blue-gradient md:py-6 py-3 px-8 md:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80">
            儲存
          </button>
        </div>
      </form>
    </div>
  </div>
}
const DraggableCard = ({ moveCard, ...props}) => {
  const targetRef = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    item: { ...props },
    type: ItemTypes.CARD,
    collect: (monitor) => ({ 
      isDragging: monitor.isDragging(),
    }),
  }));
  const [, drop] = useDrop(() =>
    ({
      accept: ItemTypes.CARD,
      
      hover(item, monitor) {
        if (!targetRef.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = props.index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = targetRef.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
        
      },
    })
  )
  drag(targetRef);
  drop(targetRef);
  return (
    <li ref={targetRef} className={`mb-4 ${isDragging ? 'bg-light/30 rounded-3xl': ''}`}>
      <Card data={props.data} index={props.index} isDragging={isDragging} />
    </li>
  );
};
function Stacking() {
  
  const [companies, setCompanies] = useState([
    {name: '抬頭工作室有限公司1'},
    {name: '抬頭工作室有限公司2'},
    {name: '抬頭工作室有限公司3'}
  ]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCompanies((prevCompanies) =>
      update(prevCompanies, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCompanies[dragIndex]],
        ],
      }),
    )
  }, [])
  return (
    <main className="container relative z-[1] text-white">
      <h1 className="font-bold text-3xl mb-4">
        INFORMATIONA
      </h1>
      <div className="hidden text-white/60 text-3xl font-bold px-10 xl:grid grid-cols-3">
        <div>
          company name
        </div>
        <ul className="grid grid-cols-3 text-xl items-center gap-x-8 justify-between">
          <li className="flex">
            liquidity
            <button type="button" className="material-icons block">info</button>
          </li>
          <li className="flex">
            Reward
            <button type="button" className="material-icons block">info</button>
          </li>
          <li>Earned</li>
        </ul>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ul className="mb-4">
          {companies.map((item, index) => 
            <DraggableCard data={item} index={index} key={`company${index}`} moveCard={moveCard} />
          )}
        </ul>
      </DndProvider>
    </main>
  );
}

export default Stacking;
