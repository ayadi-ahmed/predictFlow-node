const ApiError = require("../errors/ApiError");
const { SupplierModel } = require("../models");


class SupplierRepository {

    async findAll() {
        const suppliers = await SupplierModel.find({});
        return suppliers;
    }

    async findById(id) {
        const supplier = await SupplierModel.findById(id);
        return supplier;
    }

    async create(supplier) {
        const new_supplier = await SupplierModel.create(supplier);
        return new_supplier;
    }

    async deleteById(id) {
        return await SupplierModel.deleteOne({ _id: id });
    }


    async findOrdersBySupplier(supplierId) {
        const supplier = await SupplierModel.findOne({ _id: supplierId }).populate("orders");
        console.log(supplier)
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

    /*   async removeOrder(supplierId, order) {
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

module.exports = SupplierRepository;