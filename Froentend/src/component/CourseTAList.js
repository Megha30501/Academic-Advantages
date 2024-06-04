import {useLocation, useParams} from "react-router-dom";

const CourseTALists = ({  }) => {
    const course = useLocation().state;
    console.log(course)
    const id = useParams().id
    //const courses = course.find(t => t.id === (id))
    console.log(id)
    return (
        <div>
            <h3>{course.TA_name.toString()}</h3>
        </div>
    );
};

export default CourseTALists;



