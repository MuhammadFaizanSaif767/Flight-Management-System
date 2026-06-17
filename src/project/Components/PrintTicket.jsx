import React, { useEffect } from "react";

export default function PrintTicket({ ticket, flights, onClose }) {
    const flightDetails = flights?.find((f) => f.flight_code === ticket.flight_code) || {};

    const openPrintWindow = () => {
        const win = window.open("", "_blank", "width=850,height=650");
        if (!win) {
            alert("Please allow popups for this site to print tickets.");
            return;
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Boarding Pass – ${ticket.bk_id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Inter, system-ui, sans-serif;
      background: #f1f5f9;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .ticket {
      display: flex;
      width: 720px;
      border-radius: 16px;
      border: 2px dashed #94a3b8;
      overflow: hidden;
      background: white;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    }
    .left {
      flex: 1;
      padding: 36px;
      border-right: 2px dashed #94a3b8;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }
    .logo-box {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
    }
    .title { font-size: 22px; font-weight: 900; color: #0ea5e9; letter-spacing: 3px; }
    .subtitle { font-size: 10px; color: #94a3b8; letter-spacing: 2px; margin-top: 2px; }

    .route {
      display: flex;
      align-items: center;
      background: #f8fafc;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 28px;
    }
    .route-city { text-align: center; flex: 1; }
    .route-code { font-size: 32px; font-weight: 900; color: #1e293b; }
    .route-label { font-size: 11px; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .route-arrow {
      flex: 1;
      text-align: center;
      font-size: 22px;
      color: #0ea5e9;
      letter-spacing: -4px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }
    .field-label {
      font-size: 10px;
      color: #94a3b8;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1.5px;
    }
    .field-value {
      font-size: 17px;
      font-weight: 700;
      color: #1e293b;
      margin-top: 5px;
    }
    .field-value.highlight { color: #0ea5e9; }

    .barcode {
      border-top: 1px dashed #cbd5e1;
      padding-top: 20px;
      font-family: 'Courier New', monospace;
      font-size: 20px;
      letter-spacing: 8px;
      text-align: center;
      color: #334155;
    }

    .right {
      width: 170px;
      padding: 28px 16px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    .stub-id {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #64748b;
      text-align: center;
      word-break: break-all;
    }
    .qr-box {
      width: 100px;
      height: 100px;
      border: 3px solid #cbd5e1;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      font-size: 12px;
      font-weight: 800;
      color: #94a3b8;
      text-align: center;
      line-height: 1.6;
    }
    .stub-field { text-align: center; }
    .stub-label { font-size: 10px; text-transform: uppercase; font-weight: 700; color: #94a3b8; }
    .stub-value { font-size: 18px; font-weight: 900; color: #1e293b; margin-top: 4px; }
    .stub-value.accent { font-size: 14px; color: #0ea5e9; }

    @media print {
      body { background: white; padding: 0; }
      .ticket { box-shadow: none; border-color: #aaa; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="left">
      <div class="header">
        <div class="logo-box">✈</div>
        <div>
          <div class="title">BOARDING PASS</div>
          <div class="subtitle">FLIGHT MANAGEMENT SYSTEM</div>
        </div>
      </div>

      <div class="route">
        <div class="route-city">
          <div class="route-code">${flightDetails.Origin || "---"}</div>
          <div class="route-label">Origin</div>
        </div>
        <div class="route-arrow">✈ ─ ─ ─</div>
        <div class="route-city">
          <div class="route-code">${flightDetails.Destination || "---"}</div>
          <div class="route-label">Destination</div>
        </div>
      </div>

      <div class="grid">
        <div>
          <div class="field-label">Passenger</div>
          <div class="field-value">${ticket.bk_name}</div>
        </div>
        <div>
          <div class="field-label">Flight No.</div>
          <div class="field-value">${ticket.flight_code}</div>
        </div>
        <div>
          <div class="field-label">Booking Ref</div>
          <div class="field-value">${ticket.bk_id}</div>
        </div>
        <div>
          <div class="field-label">Class</div>
          <div class="field-value">${ticket.class}</div>
        </div>
        <div>
          <div class="field-label">Payment</div>
          <div class="field-value">${ticket.payment}</div>
        </div>
        <div>
          <div class="field-label">Price</div>
          <div class="field-value">Rs ${ticket.price}</div>
        </div>
        <div>
          <div class="field-label">Status</div>
          <div class="field-value highlight">${ticket.bk_status}</div>
        </div>
        <div>
          <div class="field-label">Seat</div>
          <div class="field-value">Open Seating</div>
        </div>
      </div>

      <div class="barcode">||| ${ticket.bk_id} |||</div>
    </div>

    <div class="right">
      <div class="stub-id">${ticket.bk_id}</div>
      <div class="qr-box">SCAN<br/>ME</div>
      <div class="stub-field">
        <div class="stub-label">Seat</div>
        <div class="stub-value">ANY</div>
      </div>
      <div class="stub-field">
        <div class="stub-label">Class</div>
        <div class="stub-value accent">${ticket.class}</div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`;

        win.document.write(html);
        win.document.close();
    };

    // Auto-open print window when component mounts
    useEffect(() => {
        const timer = setTimeout(openPrintWindow, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15,23,42,0.85)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {/* Preview card */}
            <div
                style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "32px 40px",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "90%",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                }}
            >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖨️</div>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", marginBottom: "8px" }}>
                    Printing Ticket
                </h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "4px" }}>
                    <strong>{ticket.bk_name}</strong> — {ticket.flight_code}
                </p>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>
                    Ref: {ticket.bk_id}
                </p>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>
                    A print preview window has opened. If it didn't open,
                    check your popup blocker settings.
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                        onClick={openPrintWindow}
                        style={{
                            padding: "10px 20px",
                            background: "#0ea5e9",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                        }}
                    >
                        🖨️ Print Again
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            background: "#1e293b",
                            color: "#94a3b8",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                        }}
                    >
                        ✕ Close
                    </button>
                </div>
            </div>
        </div>
    );
}
