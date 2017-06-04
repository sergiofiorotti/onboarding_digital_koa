module.exports = limit => page => document => {
    const skipQty = limit * (page - 1)
    limit = Number(limit)
    page = Number(page)

    if (limit > 0 && page > 0)
        return document.find().skip(skipQty).limit(limit).lean()
    return []
}