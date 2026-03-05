import React from "react";

export default function Alert({ alert }) {
  
  return (
    alert && (
      <div 
        className={`alert d-flex align-items-center alert-${alert.type} alert-dismissible fade show`} 
        role="alert"
        style={{ position: "fixed", top: "60px", right: "20px", minWidth: "250px", zIndex: 1000 }}
      >
        {alert.type === "success" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.08 0l3.992-3.992a.75.75 0 1 0-1.08-1.08L7.5 9.439 6.525 8.464a.75.75 0 0 0-1.08 1.08l1.525 1.486z"/>
          </svg>
        )}
        <div>{alert.message}</div>
      </div>
    )
  );
}
