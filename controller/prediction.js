const errorHandler = require("./error-handler");
cosnt = require("./error-handler");
const { CustomerModel } = require("../models");

const verifyToken = require("../config/TokenConfig");
const {
  ArticleService,
  UserService,
  CustomerOrderService,
  CompanyOrderService,
  CustomerService,
  ActivityService,
  SupplierService,
  //CategoryService,
} = require("../services");
const prediction = require("../models/prediction");

module.exports = (app) => {
  const articleService = new ArticleService();
  const userService = new UserService();
  const customerOrderService = new CustomerOrderService();
  const companyOrderService = new CompanyOrderService();
  const customerService = new CustomerService();
  const activityService = new ActivityService();
  const supplierService = new SupplierService();
  //const CategoryService = new CategoryService();

  // dans cet api, je vais remplir la table de prédistion, puis faire appel à l'api de django
  // une contrainte à utiliser: les achats d'un article x = les ventes d'un article x (obligatoire)
  app.get(
    "/predict/:userId/:articleId",
    verifyToken,
    async (req, res, next) => {
      try {
        //const user = await userService.findById(req.params.id);
        //const article = await articleService.findById(req.params.articleId);

        const users = await userService.findAll();
        const articles = await articleService.findAll();
        const customerOrders = await customerOrderService.findAll();
        const companyOrders = await companyOrderService.findAll();
        //const customers = await customerService.findAll();
        //const suppliers = await supplierService.findAll();
        //const activities = await activityService.findAll();

        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < articles.length; j++) {
            for (let k = 0; k < customerOrders.length; k++) {
              let new_prediction = new prediction();

              new_prediction.userId = users[i]._id;
              new_prediction.articleId = articles[j]._id;

              new_prediction.articleInitialQuantity = articles[j].quantity;
              new_prediction.articleCategory = articles[j].category;

              new_prediction.customerOrderQuantities =
                customerOrders[k].items[0].quantity;

              new_prediction.customer = customerOrders[k].customerId;
              new_prediction.companyOrdersQuatity = companyOrders[k].quantity;

              new_prediction.quantity_label =
                new_prediction.articleInitialQuantity +
                new_prediction.companyOrdersQuatity -
                new_prediction.customerOrderQuantities;

              await new_prediction.save();
            }
          }
        }

        res.status(200).send({
          message: "Prediction Table is fulfilled successfully",
          //data: activities,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.use(errorHandler);
};
