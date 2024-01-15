import React, { useEffect, useRef } from 'react';

const AbreviarTexto = ({ texto, largura }) => {
  const textoRef = useRef();

  useEffect(() => {
    abbreviatetexto();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [texto, largura]);

  const abbreviatetexto = () => {
    const textoElement = textoRef.current;
    const originaltexto = textoElement.textContent;

    textoElement.textContent = texto;

    if (textoElement.scrollWidth > largura) {
      while (textoElement.scrollWidth > largura && textoElement.textContent.length > 0) {
        textoElement.textContent = textoElement.textContent.slice(0, -1);
      }
      textoElement.textContent += '...';
    }

    if (textoElement.textContent !== originaltexto) {
      // Handle tooltip or other actions for truncated text if needed
    }
  };

  const handleResize = () => {
    abbreviatetexto();
  };

  return (
    <div ref={textoRef} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {texto}
    </div>
  );
};

export default AbreviarTexto;
