import React from 'react';
import { Button } from './button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
}; 