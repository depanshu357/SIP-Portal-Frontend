'use client';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: any; // Specify a more precise type based on your data structure
  onTextChange?: (delta: any, oldDelta: any, source: string) => void; // Specify a more precise type
  onSelectionChange?: (range: any, oldRange: any, source: string) => void; // Specify a more precise type
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref: any) => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Main container for the Quill editor
    const quillInstanceRef = useRef<Quill | null>(null); // Track the Quill instance locally
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // Keep the event handlers in sync
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // Handle changes to readOnly state
    useEffect(() => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.enable(!readOnly);
      }
    }, [readOnly]);

    // Initialize Quill and attach to DOM
    useEffect(() => {
      const container = containerRef.current;

      if (container && !quillInstanceRef.current) {
        const editorContainer = document.createElement('div');
        container.appendChild(editorContainer); // Attach Quill's editor container

        const quill = new Quill(editorContainer, {
          theme: 'snow', // Use a specific theme
        });

        // Set initial content if provided
        if (defaultValue) {
          quill.setContents(defaultValue);
        }

        // Save the Quill instance locally and to the forwarded ref
        quillInstanceRef.current = quill;
        if (ref) {
          ref.current = quill;
        }

        // Register event listeners
        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          if (onTextChangeRef.current) {
            onTextChangeRef.current(...args);
          }
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          if (onSelectionChangeRef.current) {
            onSelectionChangeRef.current(...args);
          }
        });

        // Cleanup function to unmount Quill properly
        return () => {
          quillInstanceRef.current = null;
          if (ref) {
            ref.current = null;
          }
          container.innerHTML = ''; // Clear the DOM container
        };
      }
    }, [defaultValue, ref]);

    return <div ref={containerRef} className="custom-quill-for-reading"></div>;
  }
);

export default Editor;
