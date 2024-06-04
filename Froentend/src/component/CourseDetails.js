import { useLocation, useParams } from "react-router-dom";

const CourseDetails = ({}) => {
    const course = useLocation().state;
    console.log(course);
    const id = useParams().id;
    console.log(id);
    return (
        <div className="coursedetails">
            <div className="courseno">{course.course_no}</div>
            <div className="details">
                <span>Instructor :</span> {course.instructor} <br/>
                <span>TA :</span> {course.TA_name} <br/>
                <span>Email of TA:</span> {course.email}<br />
                {course.location && (
                    <>
                        <span>Location:</span> {course.location}
                        <br />
                    </>
                )}
                {course.zoom && (
                    <>
                        <span>Zoom Link:</span> {course.zoom}
                        <br />
                    </>
                )}
                <span>Avaibility of TA:</span> {course.day} - {course.start_time} {course.end_time}
            </div>
        </div>
    );
};

export default CourseDetails;
