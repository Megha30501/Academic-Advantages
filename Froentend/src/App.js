import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import Course from "./component/Course";
import TAForm from './component/TAForm'
import CourseTALists from "./component/CourseTAList";
import CourseDetails from "./component/CourseDetails";
import courseService from './services/course'
import userService from './services/user'
import Notification from "./component/Notification";
const CourseList = ({ course, userRole }) => {
    const [filterCriteria, setFilterCriteria] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const filteredCourses = course.filter(course =>
        //to search any course name
        course.course_name.toLowerCase().includes(filterCriteria.toLowerCase()) ||
        course.TA_name.toLowerCase().includes(filterCriteria.toLowerCase()) ||
        // to search any number I needed to convert it in string
        course.course_code.toString().includes(filterCriteria) ||
        //since days are array I had to use loop
        course.day.some(day => day.toLowerCase().includes(filterCriteria.toLowerCase()))
    );
    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
    }
    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };
    const handleOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    const sortedCourses = filteredCourses.sort((courseA, courseB) => {
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        if(sortCriteria === 'course_code')
        {
            return courseA.course_code - courseB.course_code
        } else if (sortCriteria === 'course_name') {
            return courseA.course_name.localeCompare(courseB.course_name);
        }
        // Get the start time for each course
        const startTimeA = parseInt(courseA.start_time.replace(':', ''));
        const startTimeB = parseInt(courseB.start_time.replace(':', ''));
        // I have stored days in array so to get an array of day indices for each course
        const dayIndicesA = courseA.day.map(day => daysOfWeek.indexOf(day.toLowerCase()));
        const dayIndicesB = courseB.day.map(day => daysOfWeek.indexOf(day.toLowerCase()));

        // sorted by the first day index in the array
        const dayIndexA = dayIndicesA[0];
        const dayIndexB = dayIndicesB[0];
        // Compare the start times and the first day indices
        if (dayIndexA !== dayIndexB) {
            return dayIndexA - dayIndexB;
        }
        else {
            if (startTimeA !== startTimeB) {
                return startTimeA - startTimeB;
            }
            else {
                // If the start times and first day indices are the same, compare the end times
                const endTimeA = parseInt(courseA.end_time.replace(':', ''));
                const endTimeB = parseInt(courseB.end_time.replace(':', ''));
                if (endTimeA !== endTimeB) {
                    return endTimeA - endTimeB;
                } else {
                    return 0;
                }
            }
        }
    });
    // Handle sorting order
    if (sortOrder === 'desc') {
        sortedCourses.reverse();
    }
    return(
        <div>
            <h2>Courses Available for Spring 2023</h2>
            <label htmlFor="filter" style={{ marginRight: "0.5rem" }}>Filter the Data:</label>
            <input id="filter" type="text" value={filterCriteria} onChange={handleFilterChange} style={{ marginRight: "50rem" }} />
            <label htmlFor="sort" style={{ marginRight: "0.5rem" }}>Sort by:</label>
            <select id="sort" value={sortCriteria} onChange={handleSortChange} style={{ marginRight: "0.5rem" }} defaultValue={""}>
                <option value="dayAndTime">Day & Time</option>
                <option value="course_code">Course Code</option>
                <option value="course_name">Department</option>
            </select>
            <label htmlFor="order" style={{ marginRight: "0.5rem" }}>Order by:</label>
            <select id="order" value={sortOrder} onChange={handleOrderChange} style={{ marginRight: "0.5rem" }} defaultValue={"asc"}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            {sortedCourses.map(course =>
                <Course key={course.id} course={course} userRole={userRole} />
            )}
        </div>
    )
}

const App = () =>{
    const [course, setCourse] = useState([])
    const[TA,setTA] = useState([])
    const [notification, setNotification] = useState(null);
    const[user,setUser] = useState([])
    const[userRole, setUserRole] = useState('normal_user')
    useEffect(() => {
        courseService
            .getAll()
            .then(course => {
                setCourse(course)
            })
    }, [])
    console.log('rendered', course.length, 'groups')
    useEffect(() => {
        userService
            .getAll()
            .then(user => {
                setUser(user)
            })
    }, [])
    console.log('rendered', user.length, 'groups')

    const addTA =(taObject) => {
        courseService
            .create(taObject)
            .then(returnedTA =>{
                setTA(TA.concat(returnedTA));
                setNotification(`A New TA has been added successfully!`);
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            });
    }
    const padding = {
        margin:'5px 5px 5px 5px',
        padding: '30px 5px 10px 30px',
        borderRadius: '5px',
        transition: 'background-color 0.2s ease-in-out',
        color: '#333',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
    return(
        <div className = "container">
            <Notification message={notification} />
            <Router>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <Link style={padding} to="/">Home</Link>
                        <Link style={padding} to="/Add">Add New TA</Link>
                    </div>
                    <div>
                        <label style={{ marginRight: "10px" }}>Logged in as:</label>
                        <select onChange={(event) => setUserRole(event.target.value)}>
                            <option value="normal_user">Normal User</option>
                            <option value="admin">Admin</option>
                            <option value="TA">TA</option>
                        </select>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={ <CourseList course = {course} userRole={userRole} />} />
                    <Route path="/course/TA" element={ <CourseTALists course = {course} />} />
                    <Route path="/course/details" element={ <CourseDetails course = {course} />} />
                    <Route path="/Add" element={ <TAForm createTA={addTA} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App
