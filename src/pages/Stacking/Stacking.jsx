import { useState, useRef, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import update from 'immutability-helper'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from "../../Constants";
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../index.css';
import { debounce } from 'lodash';

function Card({id, data, isDragging, editData, index}) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = async (data) => {
    await editData(data, id);
    reset();
  };
  
  return <div className={`company rounded-[36px] ${isOpen ? 'bg-dark-green-custom' : 'bg-dark/60'} ${isDragging ? "opacity-0" : ''}`}  >
    <div className="py-5 px-10 grid xl:grid-cols-3 xl:justify-between xl:items-center gap-y-4">
      <h2 className="sm:text-4xl text-xl">
        {data.company_name} {data.order} {index}
      </h2>
      <ul className="grid grid-cols-3 justify-between xl:gap-x-8 overflow-x-auto whitespace-nowrap">
        <li className="font-light sm:text-3xl text-xl">{data.liquidity
}</li>
        <li className="font-light sm:text-3xl text-xl">{Math.round(data.liquidity / data.earned *100)/100}%</li>
        <li className="sm:text-3xl text-xl text-fill-transparent font-bold bg-clip-text bg-blue-gradient">${data.earned}</li>
      </ul>
      <div className="flex gap-4 xl:justify-end flex-wrap items-center">
        {data.phone && <a href={`tel:+${data.phone}`} className="whitespace-nowrap bg-blue-gradient py-4 px-8 sm:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80">
          聯繫公司
        </a>}
        <button type="button" className="bg-dark rounded-3xl block hover:opacity-80 px-3 sm:px-0" onClick={() => { setIsOpen(!isOpen) }}>
          <div className={`material-icons transition-all md:text-7xl sm:text-5xl text-4xl ${isOpen ? 'rotate-180' : ''}`}>arrow_drop_up</div>
        </button>
      </div>
    </div>
    <div className={`form text-white p-0 max-h-0 overflow-hidden transition-all rounded-b-[36px] ${isOpen ? 'max-h-full py-9 px-10' : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${isOpen ? 'grid' : 'hidden'} md:grid-cols-2 gap-x-4`}>
          <div className="relative mb-3">
            <input type="number" className="border rounded-lg border-white bg-transparent p-2 w-full" id="liquidity" placeholder="liquidity" {...register("liquidity", {required: {value: true,message: '此欄位必填'}, min: {value: 0, message:'最小值為 0'}, valueAsNumber: true })}/>
            <label htmlFor="liquidity" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">liquidity</label>
            <p className="text-red-500">{errors.liquidity?.message}</p>
          </div>

          <div className="relative mb-3">
            <input type="number" className="border rounded-lg border-white bg-transparent p-2 w-full" id="earned" placeholder="earned" {...register("earned", {required: {value: true,message: '此欄位必填'} , min: {value: 0, message:'最小值為 0'}, valueAsNumber: true})}/>
            <label htmlFor="earned" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">earned</label>
            <p className="text-red-500">{errors.earned?.message}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="whitespace-nowrap bg-blue-gradient py-3 px-8 md:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed" disabled={Object.keys(errors).length > 0} >
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
      <Card data={props.data[1]} id={props.data[0]} index={props.index} isDragging={isDragging} editData={props.editData} />
    </li>
  );
};
function Stacking() {
  useEffect(() => {
    getData()
  },[])
  const [companies, setCompanies] = useState([]);
  const changeOrder = () => { 
    console.log('changeOrder');
    fetch( `https://hsin-yu-reactdndproject-stage-default-rtdb.firebaseio.com/data.json`, {
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(companies))
    })
    .then(response => {
      console.log(response);
      return response.json()
    })
    .catch(error => {console.log(error)})
  }
  const debounceChangeOrder = debounce(changeOrder, 3000)
  useEffect(() => {
    companies.forEach(((item, index) => {
      if (item[1].order !== index) {
        item[1].order = index
      }
    }))
    debounceChangeOrder()
  
  },[debounceChangeOrder, companies])
  const getData = async () => {

    const data = await fetch('https://hsin-yu-reactdndproject-stage-default-rtdb.firebaseio.com/data.json')
      .then(response => response.json())
    
    setCompanies(Object.entries(data).sort((a, b) => a[1].order - b[1].order))
    
    
  }
  const editData = async (editData, id) => {
    await fetch( `https://hsin-yu-reactdndproject-stage-default-rtdb.firebaseio.com/data/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify(editData)
    })
    .then(response => response.json())
    
    
    getData();
  }
  
  
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    
    setCompanies((prevCompanies) => 
      update(prevCompanies, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCompanies[dragIndex]],
        ],
      })
    )
    
  }, [])
  return (
    <main className="container relative z-[1] text-white pb-10">
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
          {companies.length && companies.map((item, index, companies) => 
            <DraggableCard data={item} index={index} key={item[0]} moveCard={moveCard} editData={editData} companies={companies} changeOrder={changeOrder}/>
          )}
        </ul>
      </DndProvider>
    </main>
  );
}

export default Stacking;
