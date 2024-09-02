const db = require('../models/order.model');

module.exports = {
    createOrder: async (req, res) => {
        try {
            const {
                orderdProduct,
                orderdBy,
                orderPrice,
                orderQuantity,
                phoneNumber,
                addresses,
                paymentMethods,
                seller,
                selectedSize
            } = req.body;
    
            // Optional: Validate and sanitize inputs
            addresses.forEach(address => {
                if (!address.Pincode) {
                    throw new Error('Pincode is required');
                }
            });
    
            const newOrder = await db.create({
                orderdProduct,
                orderdBy,
                orderStatus: 'pending',
                orderPrice: String(orderPrice),  // Ensure orderPrice is a number
                orderQuantity: String(orderQuantity),  // Ensure orderQuantity is a number
                phoneNumber,
                addresses,
                paymentMethods,
                seller,
                selectedSize
            });
    
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: error.message });
        }
    },
    
    // my orders 
    myOrders: async (req, res) => {
        try {
            const orders = await db.find({ orderdBy: req.params.id });
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // seller of product 
    recivedOrders: async (req, res) => {
        try {
            const orders = await db.find({ seller: req.params.id });
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // delivered products 
    deliveredOrders: async (req, res) => {
        try {
            const orders = await db.find({ orderStatus: 'delivered' });
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // cancell order 

    cancelOrder : async (req,res)=>{
        try {
            const { orderId } = req.params; // Get orderId from the route parameters
        
            // Find the order by ID and update the status to "cancelled"
            const updatedOrder = await db.findByIdAndUpdate(
              orderId,
              { orderStatus: 'cancelled' },
              { new: true } // Return the updated document
            );
        
            if (!updatedOrder) {
              return res.status(404).json({ message: 'Order not found' });
            }
        
            res.status(200).json({
              message: 'Order cancelled successfully',
              order: updatedOrder,
            });
          } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
          }
    },

    // get order information by orderID
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params; // Get the ID from the URL parameters
            
            // Find the order by ID
            const order = await db.findOne({ _id: id });
            
            if (order) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Order found",
                    body: order
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    // shiped order
    shipOrder: async (req, res) => {
        try {
            const { orderId } = req.params; // Get orderId from the route parameters
        
            // Find the order by ID and update the status to "shipped"
            const updatedOrder = await db.findByIdAndUpdate(
              orderId,
              { orderStatus:'shipped' },
              { new: true } // Return the updated document
            );
        
            if (!updatedOrder) {
              return res.status(404).json({ message: 'Order not found' });
            }
        
            res.status(200).json({
              message: 'Order shipped successfully',
              order: updatedOrder,
            });
          } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
          }
    },
    
    

};
