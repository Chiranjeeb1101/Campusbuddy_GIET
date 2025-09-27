import React from 'react';

export function Careers() {
  const jobs = [
    { id: 'j1', title: 'Frontend Engineer', company: 'NextGen Labs', location: 'Remote', type: 'Full-time', referral: true },
    { id: 'j2', title: 'Data Analyst Intern', company: 'DataWorks', location: 'Pune', type: 'Internship', referral: false },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
        <p className="text-gray-600 mt-1">Explore job openings and alumni referral opportunities.</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company} • {job.location} • {job.type}</p>
              </div>
              {job.referral && (
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Referral available</span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Apply</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Request Referral</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

