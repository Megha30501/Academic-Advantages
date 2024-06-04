import {Link} from "react-router-dom"
import courseService from "../services/course";
import {useEffect, useState} from "react";
    const Course = ({ course, userRole }) => {
        const [status, setStatus] = useState('');
        const [displayStatus, setDisplayStatus] = useState('');
        console.log(course);
        const handleDelete = async () => {
            if (window.confirm(`Are you sure you want to delete the show ${course.TA_name}?`)) {
                await courseService.remove(course.id);
                window.location.reload(); // Reload the page to update the list of shows
            }
        };
        const handleStatusSubmit = async (e) => {
            e.preventDefault();
            setDisplayStatus(status);
            setTimeout(() => {
                setDisplayStatus('');
            }, 600000);
        };
        useEffect(() => {
            setDisplayStatus('');
        }, []);

        return (
            <div className="courseItem">
                <Link className="customLink" state={course} to={`/course/TA`}>
                    <div className="courseCode">{course.course_name.substring(0, 4)} {course.course_code}</div>
                </Link>
                <Link style={{ color: '#333' }} state={course} to={`/course/details`}>
                    <div className="instructor">
                        {course.TA_name} - {course.day} {course.start_time} - {course.end_time}
                    </div>
                </Link>
                {userRole === 'admin' &&
                    <div className="deletebutton">
                    <button id='delete' type="submit" onClick={() => handleDelete(course.id)}>
                        delete
                    </button>
                    </div>
                }
                {userRole === 'TA' &&
                    <div className="taStatus">
                        <form onSubmit={handleStatusSubmit}>
                            <label htmlFor="status">Status:</label>
                            <input type="text" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                }
                {displayStatus &&
                    <div className="displayStatus">
                        <label htmlFor="displayStatus">TA Status: {displayStatus}</label>
                    </div>
                }
            </div>
        );
    };
export default Course;