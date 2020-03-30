
exports.up = async function(knex) {
    await knex.schema
        .createTable("users", table => {
            table.increments("id")
            table.text("username").unique().notNullable()
            table.text("password").notNullable()
        }) 
        .createTable("contactInfo", table => {
            table.increments("id")
            table.text("email").notNullable()
            table.integer("phoneNumber").notNullable()
            table.integer("user_id")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
        })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
    await knex.schema.dropTableIfExists("contactInfo")
};
