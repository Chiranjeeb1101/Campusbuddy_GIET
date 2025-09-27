import React from 'react';

export function Donations() {
  const tiers = [
    { id: 'd1', label: 'Supporter', amount: 500 },
    { id: 'd2', label: 'Patron', amount: 2000 },
    { id: 'd3', label: 'Benefactor', amount: 5000 },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Donations</h1>
      <p className="text-gray-600 mb-6">Support scholarships, labs, and student initiatives through alumni contributions.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-900">{t.label}</h3>
            <p className="mt-1 text-2xl font-bold text-blue-600">₹{t.amount}</p>
            <button className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Donate</button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800">Corporate Matching</h4>
        <p className="text-sm text-blue-900 mt-1">Your employer may match donations. Upload proof to double the impact.</p>
      </div>
    </section>
  );
}

