import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Minimal contentEditable-based rich text editor (bold/italic/headings/
// lists/quote), shared between PageEditor.jsx and any other admin editor
// that needs formatted text stored as an HTML string.
// Uncontrolled by design: once mounted, the contentEditable DOM node is the
// single source of truth for what's on screen, and React never writes back
// into it. `value` only seeds the *initial* content (mount effect, empty
// deps). Any scheme that re-syncs from `value` on every change - even a
// "did we just emit this ourselves" guard - is fighting React's own render
// timing: a parent that stores several fields on one state object (title,
// description, etc.) produces a fresh `value` reference on every unrelated
// keystroke or re-render, and the moment that effect's guard has a gap, it
// stamps editorRef.current.innerHTML back over whatever the user just
// typed or pasted, wiping the field the instant they click back into it.
// Owning the DOM outright removes that whole failure class. To load a
// different item's content, mount a fresh instance - render this with
// `key={item.id ?? "new"}` from the parent so switching items remounts it.
const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
    }
    // Intentionally empty deps: this is the one-time initial paint only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = (html) => {
    onChange(html);
  };

  const runCommand = (command, valueArg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      emit(editorRef.current.innerHTML);
    }
  };

  // Pasting from Word/Google Docs/websites otherwise carries over inline style spans
  // and can flatten paragraph breaks entirely. Paste plain text only, preserving line breaks.
  const onPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    if (editorRef.current) {
      emit(editorRef.current.innerHTML);
    }
  };

  return (
    <Wrap className="rte">
      <div className="rte-toolbar">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("undo")}>↶</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("redo")}>↷</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H1")}>H1</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H2")}>H2</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "H3")}>H3</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("bold")}>B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("italic")}>I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("underline")}>U</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertUnorderedList")}>• List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertOrderedList")}>1. List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "BLOCKQUOTE")}>❞</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("removeFormat")}>Tx</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertHorizontalRule")}>Break</button>
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => emit(e.currentTarget.innerHTML)}
        onPaste={onPaste}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  &.rte {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #fff;
    overflow: hidden;
  }

  .rte-toolbar {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid var(--color-dark-100);
    background: #f8fafc;
    flex-wrap: wrap;
  }

  .rte-toolbar button {
    padding: 7px 11px;
    border-radius: 10px;
    background: #eef2f7;
    color: var(--color-dark-700);
    font-size: 0.85rem;
    border: 1px solid #d9e2ec;
  }

  .rte-editor {
    min-height: 260px;
    max-height: 520px;
    overflow-y: auto;
    padding: 14px;
    outline: none;
    line-height: 1.6;
    color: var(--color-dark-700);
  }
`;

export default RichTextEditor;
