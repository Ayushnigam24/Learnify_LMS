import React from "react";
import { CourseData } from "../../context/CourseContext";
import CoursesCard from "../courses/CoursesCard";

const Dashboard = ({user}) => {
  const { mycourse ,courses } = CourseData();

  

  return (
    <div className="container px-4 mx-auto min-h-screen">
      <div className="justify-items-center">
      <h2 className="text-2xl text-blue-800 font-bold p-4">All Enrolled Courses</h2>
      </div>
      <div className="grid md:grid-cols-4">
  {
       user && user.userType === "admin" && 
       courses.map((course) => <CoursesCard key={course._id} course={course} />)

     }
      </div>
      <div className="dashBoard-content grid md:grid-cols-4 gap-3">
        {mycourse.length > 0 ? (
          mycourse.map((course) => <CoursesCard key={course._id} course={course} />)
        ) : (
          <p className="text-2xl text-gray-500 font-bold p-4">No Course Enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;