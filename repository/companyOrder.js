const ApiError = require("../errors/ApiError");
const { CompanyOrderModel } = require("../models");


class CompanyOrderRepository {

    async findAll() {
        const orders = await CompanyOrderModel.find({});
        return orders;
    }
    async findAllByUserId(id) {
        const orders = await CompanyOrderModel.find({ userId: id });
        return orders;
    }
    async findOrderNumbersByUserId(id) {
        const orders = await CompanyOrderModel.find({ userId: id });
        return orders.length;
    }

    async findById(id) {
        const order = await CompanyOrderModel.findById(id).populate("articles");
        return order;
    }

    async create(order) {
        return await CompanyOrderModel.create(order);
    }

    async deleteById(id) {
        return await CompanyOrderModel.deleteOne({ _id: id });
    }


    /* 
        async findOrdersBySupplier(supplierId) {
            const supplier = await SupplierModel.findOne({ _id: supplierId });
            if (!supplier) {
                throw new ApiError("Supplier with this id not found", 404)
            };
            return supplier.orders;
        }
    
        async addOrder(supplierId, order) {
            const supplier = await SupplierModel.findOne({ _id: supplierId });
            if (!supplier) {
                throw new ApiError("Supplier with this id not found", 404)
            };
            supplier.orders.push(order);
            supplier.save();
            return "order added successfully";
        }
    
        async removeOrder(supplierId, order) {
            const supplier = await SupplierModel.findById(supplierId);
            if (!supplier) {
                throw new ApiError("Supplier with this id not found", 404)
            };
            const filtered_orders = supplier.orders.filter(o => o._id !== order._id)
            supplier.orders = filtered_orders
            supplier.save();
            return "order deleted successfully";
        } */
}

module.exports = CompanyOrderRepository;