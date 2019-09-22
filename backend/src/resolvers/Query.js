const { forwardTo } = require('prisma-binding');


const Query = {
    items: forwardTo('db'), // Note: No custom logic necessary
    item: forwardTo('db'), 
    itemsConnection: forwardTo('db'), 
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();

    //     return items;
    // }
};

module.exports = Query;
