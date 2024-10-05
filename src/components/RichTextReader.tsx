// import dynamic from 'next/dynamic';

// export default dynamic(() => import('@mantine/rte'), {
//     // Disable during server side rendering
//     ssr: false,
//     // Render anything as fallback on server, e.g. loader or html content without editor
//     loading: () => null,
//   });
'use client';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import "@/styles/mantine.custom.css"

export default  ({value}: { value: string; }) => {
  // const [value, setValue] = useState<string>(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content:value,
    immediatelyRender:false,
    editable:false
    // readOnly: true
  });

  return (
    <RichTextEditor className='custom-mantile-text-reader' editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
  