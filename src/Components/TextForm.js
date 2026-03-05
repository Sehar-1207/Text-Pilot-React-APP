import React, { useState } from "react";
import Alert from "./Alert";

export default function TextForm(prop) {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(null);

  // Function to show alert
  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2000); // auto-dismiss after 2 seconds
  };

  // Text transformations
  const handleOnClick = () => {
    setText(text.toUpperCase());
    showAlert("Converted to Uppercase", "info");
  };

  const handleLowClick = () => {
    setText(text.toLowerCase());
    showAlert("Converted to Lowercase", "info");
  };

  const handleClearClick = () => {
    setText("");
    showAlert("Text Cleared", "warning");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    showAlert("Extra spaces removed", "info");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => showAlert("Text copied successfully!", "success")) 
      .catch(() => showAlert("Failed to copy text", "danger"));
  };

  const handleExtractEmail = () => {
    const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/g);
    if (emails) showAlert("Emails found: " + emails.join(", "), "info");
    else showAlert("No emails found", "warning");
  };

  const handlePhoneNumber = () => {
    const phoneNumbers = text.match(/\+?\d[\d -]{7,}\d/g);
    if (phoneNumbers) showAlert("Phone numbers found: " + phoneNumbers.join(", "), "info");
    else showAlert("No phone numbers found", "warning");
  };

  const handleDownload = (type) => {
    let file, filename;

    if (type === "txt") {
      file = new Blob([text], { type: "text/plain" });
      filename = "text.txt";
    } else if (type === "json") {
      file = new Blob([JSON.stringify({ text }, null, 2)], { type: "application/json" });
      filename = "text.json";
    } else if (type === "doc") {
      file = new Blob([text], { type: "application/msword" });
      filename = "text.doc";
    }

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.click();

    showAlert(`${filename} downloaded!`, "info");
  };

  // Word count
  const words = text.split(/\s+/).filter((e) => e.trim().length !== 0).length;

  return (
    <>
      {/* Alert */}
      <Alert alert={alert} />

      {/* Textarea */}
      <div className="mb-3">
        <h1 style={{color: prop.mode ==='dark'?'white':'black'}}>{prop.heading}</h1>
        <textarea
          className="form-control"
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{backgroundColor: prop.mode === 'dark' ? '#83878b' : 'white',
             color: prop.mode === 'dark' ? 'white' : 'black'}}
        ></textarea>
      </div>

      {/* Buttons */}
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleOnClick}>Uppercase</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleLowClick}>Lowercase</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleClearClick}>Clear</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleCopy}>Copy To Clipboard</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handleExtractEmail}>Extract Email</button>
      <button disabled={!text} className="btn btn-secondary mx-1 my-1" onClick={handlePhoneNumber}>Extract Phone Number</button>
      {/* Download Dropdown */}
      <div className="dropdown d-inline mx-1">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={!text}>
          Download File
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => handleDownload("txt")}>TXT</button></li>
          <li><button className="dropdown-item" onClick={() => handleDownload("json")}>JSON</button></li>
          <li><button className="dropdown-item" onClick={() => handleDownload("doc")}>DOC</button></li>
        </ul>
      </div>

      {/* Summary */}
      <div className="container my-3" style={{color: prop.mode==='dark'?'white':'black'}} >
        <h2>Your Text Summary</h2>
        <p>{words} Words and {text.length} Characters</p>
        <p>{(0.008 * words).toFixed(2)} Minutes to Read</p>

        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
