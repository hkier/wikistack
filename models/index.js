var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    // },
    // date: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW
    }
}, {
        hooks:

        {
            beforeValidate: function UrlTitle(text) {
                let title = text.dataValues.title
                if (!title) {
                    let x = Math.floor(10000000 * Math.random())
                    title = x.toString()
                }
                console.log(text)
                text.dataValues.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '')


            }
        },
        getterMethods: {
            route() {
                let urlTitle = this.dataValues.urlTitle
                return '/wiki/' + urlTitle
            }
        }
    }
);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};