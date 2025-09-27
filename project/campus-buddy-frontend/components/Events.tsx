import React, { useMemo, useState } from 'react';

export function Events() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const events = useMemo(() => ([
    { id: 'e1', title: 'Annual Alumni Meet', date: '2025-10-15', location: 'Campus Auditorium', type: 'Networking', status: 'upcoming' },
    { id: 'e2', title: 'Mentorship Kickoff', date: '2025-08-30', location: 'Online', type: 'Mentorship', status: 'past' },
    { id: 'e3', title: 'Fundraising Gala', date: '2025-12-05', location: 'City Convention Center', type: 'Fundraising', status: 'upcoming' },
  ]), []);

  const filtered = events.filter((e) => e.status === tab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
          <button onClick={() => setTab('upcoming')} className={`px-4 py-2 text-sm ${tab==='upcoming' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}>Upcoming</button>
          <button onClick={() => setTab('past')} className={`px-4 py-2 text-sm border-l border-gray-200 ${tab==='past' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}>Past</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ev) => (
          <div key={ev.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{new Date(ev.date).toLocaleDateString()} • {ev.location} • {ev.type}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Register</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

