import React from 'react';

export type AdStatus = 'draft' | 'published' | 'reserved' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: AdStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<AdStatus, { label: string; color: string; bgColor: string }> = {
  draft: {
    label: 'Rascunho',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100 border-gray-300'
  },
  published: {
    label: 'Publicado',
    color: 'text-green-700',
    bgColor: 'bg-green-100 border-green-300'
  },
  reserved: {
    label: 'Reservado',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100 border-yellow-300'
  },
  completed: {
    label: 'Concluído',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100 border-blue-300'
  },
  cancelled: {
    label: 'Cancelado',
    color: 'text-red-700',
    bgColor: 'bg-red-100 border-red-300'
  }
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] || statusConfig.draft;
  
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium border
      ${config.color} ${config.bgColor} ${sizeClasses[size]}
    `}>
      {config.label}
    </span>
  );
};

interface StatusSelectorProps {
  currentStatus: AdStatus;
  onStatusChange: (newStatus: AdStatus) => void;
  disabled?: boolean;
}

const validTransitions: Record<AdStatus, AdStatus[]> = {
  draft: ['published', 'cancelled'],
  published: ['reserved', 'cancelled'],
  reserved: ['completed', 'published'],
  completed: [],
  cancelled: ['draft', 'published']
};

export const StatusSelector: React.FC<StatusSelectorProps> = ({ 
  currentStatus, 
  onStatusChange,
  disabled = false 
}) => {
  const availableStatuses = validTransitions[currentStatus] || [];

  if (availableStatuses.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Este anúncio está concluído e não pode mudar de status.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Status atual:</span>
        <StatusBadge status={currentStatus} size="md" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Alterar para:
        </label>
        <div className="flex flex-wrap gap-2">
          {availableStatuses.map(status => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              disabled={disabled}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200
                ${statusConfig[status].bgColor}
                ${statusConfig[status].color}
                border-2 hover:shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95
              `}
            >
              {statusConfig[status].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatusFlowProps {
  status: AdStatus;
}

export const StatusFlow: React.FC<StatusFlowProps> = ({ status }) => {
  const allStatuses: AdStatus[] = ['draft', 'published', 'reserved', 'completed'];
  const currentIndex = allStatuses.indexOf(status);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {allStatuses.map((s, index) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                font-semibold text-sm
                ${index <= currentIndex
                  ? `${statusConfig[s].bgColor} ${statusConfig[s].color} border-2`
                  : 'bg-gray-200 text-gray-400 border-2 border-gray-300'
                }
              `}>
                {index + 1}
              </div>
              <span className={`
                mt-2 text-xs font-medium
                ${index <= currentIndex ? 'text-gray-700' : 'text-gray-400'}
              `}>
                {statusConfig[s].label}
              </span>
            </div>
            
            {index < allStatuses.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-2 mb-6
                ${index < currentIndex ? 'bg-blue-500' : 'bg-gray-300'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBadge;
