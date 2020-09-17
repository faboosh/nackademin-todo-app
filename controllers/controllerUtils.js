module.exports = {
    sort: function({req, model, filter = {}, sortKey}) {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;
        const sort = req.query.sort && req.query.sort == 'desc' ? 'desc' : 'asc';
        let sortObj = {};
        sortObj[sortKey] = sort;

        return model.find(filter)
            .limit(limit)
            .skip(limit * page)
            .sort(sortObj)
    }
}