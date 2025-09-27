import React, { useState } from 'react';

export function AlumniDirectory() {
  const [query, setQuery] = useState('');

  const sampleAlumni = [
    { id: '1', name: 'Aarav Sharma', batch: '2019', role: 'Software Engineer', company: 'Acme Corp', location: 'Bengaluru' },
    { id: '2', name: 'Ishita Patel', batch: '2018', role: 'Product Manager', company: 'Globex', location: 'Mumbai' },
    { id: '3', name: 'Rahul Verma', batch: '2020', role: 'Data Scientist', company: 'Initech', location: 'Remote' },
  ];

  const filtered = sampleAlumni.filter((a) =>
    `${a.name} ${a.batch} ${a.role} ${a.company} ${a.location}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alumni Directory</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, batch, role, company..."
          className="w-full md:w-96 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((alumnus) => (
          <div key={alumnus.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{alumnus.name}</h3>
                <p className="text-sm text-gray-500">Batch {alumnus.batch}</p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{alumnus.location}</span>
            </div>
            <p className="mt-3 text-gray-700">{alumnus.role} at {alumnus.company}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Connect</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

