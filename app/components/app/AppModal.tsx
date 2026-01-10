"use client";

import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const AppModal: React.FC<PropsWithChildren<AppModalProps>> = ({ isOpen, onClose, children, title }) => {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
     if (!isOpen) {
       setMounted(false);
       setIsAnimating(false);
       return;
     }
    
    setMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-[1000ms] ${isAnimating ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`z-50 bg-brand-primary border-2 border-white p-6 shadow-xl max-w-[75rem] w-full mx-4 transition-opacity duration-[1000ms] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            className="text-white hover:text-accent text-3xl font-bold w-12 h-12 flex items-center justify-center cursor-pointer"
            onClick={onClose} 
          >
            <FontAwesomeIcon 
              size="1x" 
              className="h-[60px] w-[60px]" 
              icon={faXmark} 
            />  
          </button>
          
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppModal;