import React from 'react';
import Navbar from '../components/Navbar';

const AttendanceDashboard = () => {
  const [open, setOpen] = React.useState(false);

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : {};
  const attendance = Array.isArray(user?.attendance) ? user.attendance : [];
  const currentAttendance = attendance.length > 0 ? attendance[attendance.length - 1] : {};
  const attendanceData = currentAttendance?.today || [];


  return (
    <>
      <Navbar />
      <div className="mx-auto bg-neutral-950 max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900">
          <div className="p-4 border-b border-neutral-800">
            <div className="text-white font-semibold">Overview</div>
          </div>
        </div>

        <div className="p-4 bg-neutral-900">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Today's Attendance</div>
                <div className="text-neutral-400 text-xs"> Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {attendanceData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                    <div className="text-neutral-200 text-sm">
                      <div className="font-medium">{item.id} - {item.subject}</div>
                      <div className="text-xs text-neutral-400">Marked by: {item.instructor}</div>
                    </div>
                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs border-emerald-800 bg-emerald-950 text-emerald-300 capitalize">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceDashboard;
