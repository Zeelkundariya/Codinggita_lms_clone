import React from 'react'
import Navbar from '../components/Navbar'

const StudentDashboard = () => {
  const [open, setOpen] = React.useState(false);

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : {};
  const name = user?.name || "Student";
  const university = user?.university || "N/A";
  const email = user?.email || "N/A";
  const mobile = user?.mobile || "N/A";
  const uid = user?.uid || "N/A";

  const attendance = Array.isArray(user?.attendance) ? user.attendance : [];
  const currentAttendance = attendance.length > 0 ? attendance[attendance.length - 1] : {};

  return (
    <>
      <Navbar />
      <div className="mx-auto bg-neutral-950 max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 ">
            <div className="p-4 ">
              <p className="text-neutral-400 text-sm">University</p>
              <p className="text-2xl font-semibold text-white mt-1">{university}</p>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 ">
            <div className="p-4 ">
              <p className="text-neutral-400 text-sm">UID</p>
              <p className="text-2xl font-semibold text-white mt-1">{uid}</p>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 ">
            <div className="p-4 ">
              <p className="text-neutral-400 text-sm">Subjects</p>
              <p className="text-2xl font-semibold text-white mt-1">{user.subjects?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
          <div className="p-4 border-b border-neutral-800 ">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">
                {currentAttendance?.semester || "N/A"} Attendance
                <span className="ml-5"></span>
                <span className="ml-5">
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-purple-600/20 border-purple-600/50 text-purple-400">
                    Bonus {currentAttendance?.bonus || 0}%
                  </span>
                </span>
              </div>
              <div className="text-sm text-neutral-400">
                {currentAttendance?.total ? (currentAttendance.present / currentAttendance.total * 100).toFixed(0) : 0}%
              </div>
            </div>
          </div>
          <div className="p-4 ">
            <div className="space-y-3">
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-500"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="97"
                  role="progressbar"
                  style={{ width: `${currentAttendance?.total ? (currentAttendance.present / currentAttendance.total * 100).toFixed(1) : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Present {currentAttendance?.present || 0} / {currentAttendance?.total || 0} marked sessions</span>
                <span>{currentAttendance?.startDate || "N/A"} - {currentAttendance?.endDate || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile & Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Card */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 lg:col-span-1">
            <div className="p-4 border-b border-neutral-800 ">
              <div className="flex items-center gap-3">
                <img
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover"
                  src={user.avatar || user.image || "https://avatars.githubusercontent.com/u/224962377?v=4&size=64"}
                />
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <div className="text-white font-semibold">{user.name}</div>
                  </div>
                  <div className="text-neutral-400 text-xs">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="p-4 ">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Mobile</span><span className="text-neutral-200">{user.mobile}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">DOB</span><span className="text-neutral-200">N/A</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">University</span><span className="text-neutral-200">{user.university}</span></div>
              </div>
            </div>
          </div>

          {/* Subjects Card */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 lg:col-span-2">
            <div className="p-4 border-b border-neutral-800 ">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">Subjects</div>
                <div className="flex items-center gap-3">
                  <a className="text-xs text-neutral-400 hover:text-white" href="/student/attendance">View attendance</a>
                </div>
              </div>
            </div>
            <div className="p-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {user.subjects?.map((subject, index) => (
                  <div key={index} className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-sm text-neutral-300 truncate">{subject}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
          <div className="p-4 border-b border-neutral-800 ">
            <div className="text-white font-semibold">Mentors</div>
          </div>
          <div className="p-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white">
                    {(user?.mentors?.[0]?.name || "N")[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium leading-tight">{user?.mentors?.[0]?.name || 'N/A'}</div>
                    <div className="text-neutral-400 text-xs">{university}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Assignments */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-1 mb-6">
          <div className="p-4 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="text-white font-semi-bold">Assignments</div>
                <div className="flex items-center gap-3">
                 <div className="text-neutral-400 text-sm">Pending: 0</div>
                  <a className="text-xs text-neutral-400 hover:text-white" href="/student/calendar">View all</a>
             </div>
            </div>
            </div>
            <div className=" ml-1 p-2 mt-2 mb-2 text-neutral-400 text-sm"> No pending assignments. Great job!</div>
          </div>
          
        



        {/*Upcoming Events */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-1 mb-6">
          <div className="p-4 border-b border-neutral-800">
                      <div className="flex items-center justify-between">

            <div className="text-white font-semi-bold">Upcoming Events</div>
            <div className="flex items-center gap-3">
            <div className="text-neutral-400 text-sm">0 shown </div>
            <a className="text-xs text-neutral-400 hover:text-white" href="/student/calendar">View all</a>
           </div>
            </div>
          </div>
          <div className=" ml-1 p-2 mt-2 mb-2 text-neutral-400 text-sm">No upcoming events.</div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-neutral-400 text-sm">Need help?</div>
            <div className="text-white text-base mt-1">Contact your mentor</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-neutral-400 text-sm">Timetable</div>
            <div className="text-white text-base mt-1">Check classes (coming soon)</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-neutral-400 text-sm">Chat</div>
            <a className="text-white text-base mt-1 hover:underline" href="/student/chat-groups">View Chat Groups</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDashboard
