const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class MeController {

    //[GET] /me/stored-courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find()

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({ [req.query.column]: req.query.type })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([course, deletedCount]) => {
                res.render('me/stored-courses', { courses: multipleMongooseToObject(course), deletedCount: deletedCount })
            })
            .catch(next)

        // Course.countDocumentsDeleted()
        // .then(deletedCount=>console.log(deletedCount))
        // .catch(()=>{})
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) }))
        //     .catch(err => next(err))
    }
    //[GET] /me/trash-courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) }))
            .catch(err => next(err))
    }

}

module.exports = new MeController;