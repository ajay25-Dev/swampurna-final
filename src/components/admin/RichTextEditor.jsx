import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Minimal contentEditable-based rich text editor (bold/italic/headings/
// lists/quote), shared between PageEditor.jsx and any other admin editor
// that needs formatted text stored as an HTML string.
const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const runCommand = (command, valueArg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Pasting from Word/Google Docs/websites otherwise carries over inline style spans
  // and can flatten paragraph breaks entirely. Paste plain text only, preserving line breaks.
  const onPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
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
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
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
