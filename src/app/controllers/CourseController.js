const Course = require('../models/Course')
const { mongooseToObject } = require('../../utils/mongoose')

class CourseController {

    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(next)

    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }
    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next)
    }
    //[PUT] /courses/:id/
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('me/stored/courses'))
            .catch(next)

    }

    //[DELETE] /courses/:id/
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }
    //[DELETE-FOREVER] /courses/:id/fore
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body
        console.log('======', req.body);
        formData.image = 'https://www.stdio.vn/javascript/gioi-thieu-va-cai-dat-node-js-11TlmL'
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('me/stored/courses'))
            .catch(next)

    }
    //[POST] /courses/handle-form-actions
    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
            Course.delete({ _id: {$in:req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next)
            break;
            
            default: res.json({message:'Action is invalid'})
        }
    }

}

module.exports = new CourseController;