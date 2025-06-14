const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Product = require('../products/product.model');
const router = express.Router();

// Admin Stats Endpoint
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Trending product count
        const trendingProductsCount = await Product.aggregate([
            { $match: { trending: true } },
            { $count: "trendingProductsCount" }
        ]);
        const trendingProducts = trendingProductsCount.length > 0 ? trendingProductsCount[0].trendingProductsCount : 0;

        // 4. Total number of products
        const totalProducts = await Product.countDocuments();

        // 5. Monthly sales
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingProducts,
            totalProducts,
            monthlySales
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

module.exports = router;
