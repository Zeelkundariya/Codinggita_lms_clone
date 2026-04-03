import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const SemesterAttendance = () => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : {};
  const name = user?.name || "Student";

  // FIXED: Ensure attendance is always an array
  const attendance = Array.isArray(user?.attendance) ? user.attendance : [];

  const semesterData = attendance.map((sem) => ({
    id: sem.semester,
    title: sem.semester,
    dateRange: `${sem.startDate} - ${sem.endDate}`,
    percentage: sem.percentLabel,
    totalMarked: sem.total || 0,
    present: sem.present || 0,
    absent: (sem.total || 0) - (sem.present || 0),
    leave: sem.bonus || 0,
    duration: `${sem.startDate} to ${sem.endDate}`,
  }));

  // State to track selected semester
  const [activeSem, setActiveSem] = useState(semesterData[0] || null);

  // Helper for progress bar color
  const getProgressColor = (percent) => percent < 75 ? 'bg-red-500' : 'bg-green-500';

  // Show loading or empty state if no semester data
  if (!activeSem || semesterData.length === 0) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-20 text-white">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center">
            <div className="text-neutral-400 mb-2">No attendance data available</div>
            <div className="text-sm text-neutral-500">Please check back later for your attendance records.</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-20 text-white">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Semester Attendance</h1>
          <p className="text-neutral-400 text-sm mt-1">View your attendance statistics by semester</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="p-4 border-b border-neutral-800 font-semibold">Semesters</div>
              <div className="p-4 space-y-2">
                {semesterData.map((sem) => (
                  <button
                    key={sem.id}
                    onClick={() => setActiveSem(sem)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${activeSem.id === sem.id
                        ? 'border-blue-600 bg-blue-950 text-blue-200'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:bg-neutral-800'
                      }`}
                  >
                    <div className="font-medium">{sem.title}</div>
                    <div className="text-xs text-neutral-400 mt-1">{sem.dateRange}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{activeSem.title}</div>
                  <div className="text-neutral-400 text-xs">{activeSem.dateRange}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{activeSem.percentage}%</div>
                  <div className="text-xs text-neutral-400">Attendance</div>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-neutral-300">Overall Progress</span>
                    <span className="font-medium">{activeSem.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-3 transition-all duration-500 ${getProgressColor(activeSem.percentage)}`}
                      style={{ width: `${activeSem.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Classes", val: activeSem.totalMarked, color: "text-white" },
                    { label: "Present", val: activeSem.present, color: "text-green-400" },
                    { label: "Absent", val: activeSem.absent, color: "text-red-400" },
                    { label: "Attendance %", val: `${activeSem.percentage}%`, color: "text-blue-400" }
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                      <div className="text-neutral-400 text-xs">{stat.label}</div>
                      <div className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-neutral-800 pt-4">
                  <div>
                    <div className="text-sm text-neutral-400 mb-3">Status Breakdown</div>
                    <div className="space-y-2">
                      <StatusRow label="Present Count" value={activeSem.present} color="green" />
                      <StatusRow label="Absent Count" value={activeSem.absent} color="red" />
                      <StatusRow label="Bonus/Leave" value={activeSem.leave} color="yellow" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-3">Period Information</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Duration</span>
                        <span>{activeSem.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Start Date</span>
                        <span>{activeSem.dateRange.split(' - ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">End Date</span>
                        <span>{activeSem.dateRange.split(' - ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            {activeSem.percentage < 75 && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4">
                <div className="text-red-400 flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <span>Your attendance is critically low. Please prioritize attending classes.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Sub-component for clean status rows
const StatusRow = ({ label, value, color }) => {
  const colorMap = {
    green: 'border-green-800 bg-green-950 text-green-300',
    red: 'border-red-800 bg-red-950 text-red-300',
    yellow: 'border-yellow-800 bg-yellow-950 text-yellow-300'
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-300">{label}</span>
      <span className={`px-2 py-0.5 rounded-md border text-xs ${colorMap[color] || 'border-neutral-800 bg-neutral-950 text-neutral-300'}`}>
        {value}
      </span>
    </div>
  );
};

export default SemesterAttendance;