import React from 'react';

export const GlobalStyles: React.FC = () => (
  <style>
    {`
      html {
        scroll-behavior: smooth;
      }
      
      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-slide-up {
        animation: fadeSlideUp 1s ease-out forwards;
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(225, 29, 72, 0.5) transparent;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgba(225, 29, 72, 0.5);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(225, 29, 72, 0.7);
      }
    `}
  </style>
);