// src/pages/Invoice.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";


const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();
  const invoiceRef = useRef(); // 👈 for PDF

  useEffect(() => {
    const stored = localStorage.getItem("lastInvoice");
    if (stored) {
      setInvoice(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const downloadPDF = () => {
    const element = invoiceRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `${invoice?.id || "invoice"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  if (!invoice) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div ref={invoiceRef} className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">🧾 Invoice</h1>
        <div className="mb-4">
          <p><strong>Invoice ID:</strong> {invoice.id}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Status:</strong> <span className="text-green-600">{invoice.status}</span></p>
        </div>
        <hr className="my-4" />
        <h2 className="text-xl font-semibold mb-2">Items:</h2>
        {invoice.items.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="text-right text-xl font-bold">
          Total: ₹{invoice.total}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPDF}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          📄 Download PDF
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Invoice;
