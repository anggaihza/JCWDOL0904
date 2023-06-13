"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Promotions", [
      {
        name: "banner1",
        promotion_image: "http://localhost:8000/banner1.png",
        resolusi: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banner2",
        promotion_image: "http://localhost:8000/banner2.png",
        resolusi: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banner3",
        resolusi: 1,
        promotion_image: "http://localhost:8000/banner3.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banner phone1",
        promotion_image: "http://localhost:8000/banner_phone1.png",
        resolusi: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banner2",
        promotion_image: "http://localhost:8000/banner_phone2.png",
        resolusi: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banner3",
        resolusi: 2,
        promotion_image: "http://localhost:8000/banner_phone3.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Promotions", null, {});
  },
};
