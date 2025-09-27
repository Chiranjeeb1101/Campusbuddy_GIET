import React from 'react';

export function Mentorship() {
  const mentors = [
    { id: 'm1', name: 'Neha Gupta', expertise: ['Frontend', 'React'], company: 'Acme', availability: '2 hrs/week' },
    { id: 'm2', name: 'Arjun Rao', expertise: ['Backend', 'Node.js'], company: 'Globex', availability: '1 hr/week' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mentorship</h1>
        <p className="text-gray-600 mt-1">Find mentors for guidance, mock interviews, and career advice.</p>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Find Matches</button>
          <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Become a Mentor</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.company}</p>
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{m.availability}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.expertise.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Request Mentorship</button>
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

