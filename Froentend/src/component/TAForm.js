import { useState } from 'react';

const TAForm  = ({ createTA }) => {
    const [newTAName, setNewTAName]=useState('')
    const [courseName, setCourseName] = useState('COMP - Computer Science');
    const [courseCode, setCourseCode] = useState('');
    const [instructor, setInstructor] = useState('');
    const [email, setEmail] = useState('');
    const [zoomLink, setZoomLink] = useState('');
    const [location, setLocation] = useState('');
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleDays = (event) => {
        const options = event.target.options;
        const selectedDays = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedDays.push(options[i].value);
            }
        }
        setDays(selectedDays);
    };
    const addTA = (event) => {
        event.preventDefault();
        createTA({
            TA_name: newTAName,
            course_name: courseName,
            course_code: courseCode,
            instructor: instructor,
            email: email,
            zoom: zoomLink,
            location: location,
            day: days,
            start_time: startTime,
            end_time: endTime,
        });
        setNewTAName('');
        setCourseName('');
        setCourseCode('');
        setInstructor('');
        setEmail('');
        setZoomLink('');
        setLocation('');
        setDays([]);
        setStartTime('');
        setEndTime('');
    };

    return(
        <div className="formDiv">
            <h2>Add new TA</h2>
            <form onSubmit={addTA}>
                <div>
                    TA's Name :<span className="required">*</span>
                    <input type="text" value={newTAName} onChange={(e) => setNewTAName(e.target.value)}  /><br/>
                    Subject:<span className="required">*</span>
                    <select value={courseName} onChange={(e) => setCourseName(e.target.value)} defaultValue="COMP - Computer Science">
                        <option value="COMP - Computer Science">COMP - Computer Science</option>
                        <option value="ENGR - General Engineering"> ENGR - General Engineering</option>
                        <option value="MSBS - MS Business Analytics">MSBS - MS Business Analytics</option>
                    </select> <br/>
                    Course Code :<span className="required">*</span>
                    <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} /><br/>
                    Instructor :<span className="required">*</span>
                    <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} /><br/>
                    Email :<span className="required">*</span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    Zoom :
                    <input type="text" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} /> <b>OR/And Both</b>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
                    Day's when you're available :<span className="required">*</span>
                    <select multiple value={days}  onChange={handleDays}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                </select><br/>
                    Start Time:<span className="required">*</span>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    <br />
                    End Time:<span className="required">*</span>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    <br />
                </div>
                <div>
                    <button id="submit-button" type="submit">Create</button>
                </div>
            </form>
        </div>
    );

};
export default TAForm;