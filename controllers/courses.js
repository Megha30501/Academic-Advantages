const coursesRouter = require("express").Router();
const Course = require("../models/course");
coursesRouter.get("/", (request, response) => {
    Course.find({}).then(course => {
        response.json(course);
    });
});
coursesRouter.get("/:id", (request, response, next) => {
    Course.findById(request.params.id)
        .then(course => {
            if (course) {
                response.json(course);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

coursesRouter.post("/", (request, response, next) => {
    const body = request.body;
    const course = new Course({
        TA_name:body.TA_name,
        course_name:body.course_name,
        course_code: body.course_code,
        instructor:body.instructor,
        email:body.email,
        zoom:body.zoom,
        location:body.location,
        day:body.day,
        start_time:body.start_time,
        end_time:body.end_time,
    });
    course.save()
        .then(savedCourse => {
            response.status(201).json(savedCourse);
        })
        .catch(error => next(error));
});
coursesRouter.delete("/:id", async (request, response) => {
    await Course.findByIdAndRemove(request.params.id);
    response.status(204).end();
});
coursesRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const course = {
        TA_name:body.TA_name,
        course_name:body.course_name,
        course_code: body.course_code,
        instructor:body.instructor,
        email:body.email,
        zoom:body.zoom,
        location:body.location,
        day:body.day,
        start_time:body.start_time,
        end_time:body.end_time
    };

    Course.findByIdAndUpdate(request.params.id, course, { new: true })
        .then(updatedCourse => {
            response.json(updatedCourse);
        })
        .catch(error => next(error));
});
module.exports = coursesRouter;