const articlecontroller = require('./../controllers/article')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(articlecontroller.getAll)

    /**
     * add an article
     */
    router
        .route('/article')
        .post(multipartWare, articlecontroller.addArticle)

}
