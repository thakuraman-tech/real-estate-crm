import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Clock, Flag } from 'lucide-react';

const initialData = {
  stages: {
    'stage-1': { id: 'stage-1', title: 'Lead In', dealIds: ['deal-1', 'deal-2'] },
    'stage-2': { id: 'stage-2', title: 'Negotiation', dealIds: ['deal-3'] },
    'stage-3': { id: 'stage-3', title: 'Agreement Sent', dealIds: ['deal-4'] },
    'stage-4': { id: 'stage-4', title: 'Closed Won', dealIds: [] }
  },
  deals: {
    'deal-1': { id: 'deal-1', title: 'Palm Jumeirah Villa', client: 'Priya Patel', value: '$4.5M', priority: 'High', daysAgo: 2, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    'deal-2': { id: 'deal-2', title: 'Downtown Penthouse', client: 'Rohit Kumar', value: '$2.1M', priority: 'Medium', daysAgo: 5, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80' },
    'deal-3': { id: 'deal-3', title: 'Suburb Home', client: 'Anil Gupta', value: '$650K', priority: 'Low', daysAgo: 1, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80' },
    'deal-4': { id: 'deal-4', title: 'Office Space', client: 'Infosys', value: '$1.2M', priority: 'High', daysAgo: 8, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
  },
  stageOrder: ['stage-1', 'stage-2', 'stage-3', 'stage-4']
};

const PriorityFlag = ({ priority }) => {
  const colors = {
    'High': 'text-red-500',
    'Medium': 'text-yellow-500',
    'Low': 'text-gray-400'
  };
  return <Flag size={14} className={`${colors[priority]}`} fill="currentColor" />;
};

export default function DealsPipeline() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startStage = data.stages[source.droppableId];
    const finishStage = data.stages[destination.droppableId];

    if (startStage === finishStage) {
      const newDealIds = Array.from(startStage.dealIds);
      newDealIds.splice(source.index, 1);
      newDealIds.splice(destination.index, 0, draggableId);

      const newStage = { ...startStage, dealIds: newDealIds };
      setData({ ...data, stages: { ...data.stages, [newStage.id]: newStage } });
      return;
    }

    const startDealIds = Array.from(startStage.dealIds);
    startDealIds.splice(source.index, 1);
    const newStart = { ...startStage, dealIds: startDealIds };

    const finishDealIds = Array.from(finishStage.dealIds);
    finishDealIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishStage, dealIds: finishDealIds };

    setData({ ...data, stages: { ...data.stages, [newStart.id]: newStart, [newFinish.id]: newFinish } });
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Deals Pipeline</h1>
        <p className="text-gray-500 mt-1">Drag and drop details to update their stages.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full gap-6 items-start">
            {data.stageOrder.map((stageId) => {
              const stage = data.stages[stageId];
              const deals = stage.dealIds.map(dealId => data.deals[dealId]);

              return (
                <div key={stage.id} className="bg-gray-100/60 rounded-2xl w-[340px] shrink-0 flex flex-col max-h-full border border-gray-200 shadow-inner">
                  <div className="p-4 flex justify-between items-center px-5 pt-5 pb-3">
                    <h3 className="font-bold text-gray-800 tracking-tight">{stage.title}</h3>
                    <span className="bg-white px-2.5 py-1 text-gray-600 text-sm font-bold rounded-lg shadow-sm border border-gray-200">{deals.length}</span>
                  </div>
                  
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                        className={`flex-1 p-3 pt-0 overflow-y-auto min-h-[150px] transition-colors ${snapshot.isDraggingOver ? 'bg-brand-50/50 rounded-b-2xl' : ''}`}
                      >
                        {deals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white p-4 mb-3 rounded-xl border transition-all ${snapshot.isDragging ? 'shadow-xl shadow-brand-500/20 border-brand-400 rotate-2' : 'shadow-sm border-gray-200/80 hover:border-brand-300 hover:shadow-md'}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex gap-2 items-center">
                                    <PriorityFlag priority={deal.priority} />
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{deal.title}</h4>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 my-3">
                                  <img src={deal.avatar} alt={deal.client} className="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100" />
                                  <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-gray-700">{deal.client}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10} />Added {deal.daysAgo} days ago</span>
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                                  <div className="text-sm font-extrabold text-brand-600">{deal.value}</div>
                                  <div className="bg-gray-50 px-2 py-1 rounded text-[10px] font-bold text-gray-500 tracking-wider uppercase border border-gray-100">
                                    {deal.priority} PRIORITY
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
