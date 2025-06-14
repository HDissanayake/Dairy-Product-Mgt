const Order = require('../orders/order.model');
const PDFDocument = require('pdfkit');

// Generate order report PDF
const generateOrderReport = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // Set headers for PDF response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=order_report.pdf');

    const doc = new PDFDocument();
    doc.pipe(res); // Stream to response

    // Use built-in font
    doc.font('Times-Roman');

    // Title
    doc.fontSize(20).text('Order Report', { align: 'center', underline: true });
    doc.moveDown();

    // Loop through each order and add details
    orders.forEach((order, index) => {
      doc
        .fontSize(12)
        .text(`Order #${index + 1}`, { underline: true })
        .text(`Order ID: ${order._id}`)
        .text(`Customer Name: ${order.name}`)
        .text(`Email: ${order.email}`)
        .text(`Phone: ${order.phone}`)
        .text(`Total Price: Rs.${order.totalPrice}`)
        .text(`Status: ${order.status}`)
        .text(`Date: ${order.createdAt.toDateString()}`)
        .moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Error generating order report PDF:", error);
    res.status(500).json({ message: "Failed to generate order report" });
  }
};

module.exports = {
  generateOrderReport,
};
