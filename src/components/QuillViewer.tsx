'use client';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill'; // Ensure you import Quill from the correct path

interface QuillViewerProps {
  readOnly?: boolean;
  defaultValue?: any; // Specify a more precise type based on your data structure
  onTextChange?: (delta: any, oldDelta: any, source: string) => void; // Specify a more precise type
  onSelectionChange?: (range: any, oldRange: any, source: string) => void; // Specify a more precise type
}

// QuillViewer is an uncontrolled React component
const QuillViewer = forwardRef<Quill | null, QuillViewerProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref:any) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef<any>(defaultValue); // Specify a more precise type based on your data structure
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref && typeof ref !== 'function') {
        (ref as React.MutableRefObject<Quill | null>).current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement('div')
        );
        const quill = new Quill(editorContainer, {
          theme: 'snow',
        });

        if (ref) {
          (ref as React.MutableRefObject<Quill | null>).current = quill;
        }

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });

        return () => {
          if (ref) {
            (ref as React.MutableRefObject<Quill | null>).current = null;
          }
          container.innerHTML = '';
        };
      }
    }, [ref]);

    return <div ref={containerRef} className='custom-quill-for-reading'></div>;
  }
);

export default QuillViewer;
