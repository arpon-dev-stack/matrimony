import {MouseEventHandler, ReactNode} from 'react'

export const PrimaryGoldButton = ({ children, className = '', onClick }: {children: ReactNode, className: string, onClick: MouseEventHandler<HTMLButtonElement>}) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:brightness-105 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-white font-semibold rounded-lg flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </button>
);