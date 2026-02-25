import { useState } from 'react';
import { Heart, Sparkles, CheckCircle, ArrowRight, Gift, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DonationTier {
  id: string;
  label: string;
  amount: number;
  description: string;
  benefits: string[];
  color: string;
}

export function Donations() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const tiers: DonationTier[] = [
    {
      id: 'd1',
      label: 'Supporter',
      amount: 500,
      description: 'Support a single student workshop or academic resource bundle.',
      benefits: ['Newsletter Access', 'Digital Certificate'],
      color: 'indigo'
    },
    {
      id: 'd2',
      label: 'Patron',
      amount: 2000,
      description: 'Fund a month of advanced training for underprivileged students.',
      benefits: ['Hall of Fame Mention', 'Exclusive Webinars', 'Priority Support'],
      color: 'purple'
    },
    {
      id: 'd3',
      label: 'Benefactor',
      amount: 5000,
      description: 'Sponsor a full scholarship or a major research initiative.',
      benefits: ['VIP Campus Access', 'Legacy Plaque', 'Personal Mentorship Profile'],
      color: 'brand-surface'
    },
  ];

  const handleDonate = (label: string, amount: number) => {
    setToastMessage(`Transaction Successful: ₹${amount} as ${label}. Thank you for your impact!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-16 rounded-[3rem] overflow-hidden bg-slate-900 p-8 lg:p-16 text-white text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Advancement</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            Enable the <span className="text-indigo-400">Future</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-10">
            Your contributions directly fund scholarships, state-of-the-art labs, and student-led innovation hubs.
            Every donation, regardless of size, accelerates academic excellence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-black text-indigo-400">$2.4M</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Raised</p>
            </div>
            <div>
              <p className="text-3xl font-black text-purple-400">1.2K</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Donors</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-400">450+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Scholars</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">12</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Countries</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ y: -10 }}
            className={`relative flex flex-col group bg-white rounded-[2.5rem] shadow-premium border-2 transition-all duration-500 ${selectedTier === tier.id ? 'border-brand-primary' : 'border-slate-50'
              }`}
            onClick={() => setSelectedTier(tier.id)}
          >
            <div className="p-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 transition-colors`}>
                  <Coins className="h-6 w-6 text-indigo-600" />
                </div>
                {tier.id === 'd2' && (
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{tier.label}</h3>
              <p className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                ₹{tier.amount.toLocaleString()}
                <span className="text-sm text-slate-400 font-bold ml-1 uppercase tracking-widest">Once</span>
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                {tier.description}
              </p>

              <div className="space-y-4 mb-10">
                {tier.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDonate(tier.label, tier.amount);
                }}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${selectedTier === tier.id
                  ? 'bg-brand-surface text-white shadow-xl shadow-indigo-500/20'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
              >
                Proceed to Payment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 glass-card rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-8 justify-between shadow-2xl"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <Gift className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Corporate Matching Available</h4>
            <p className="text-slate-500 font-medium text-sm lg:text-base">Many employers match their employees' philanthropic contributions. Verify your eligibility.</p>
          </div>
        </div>
        <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:border-indigo-600 transition-all uppercase tracking-widest text-[10px] whitespace-nowrap active:scale-95 shadow-sm">
          Check Eligibility
        </button>
      </motion.div>

      {/* Action Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{toastMessage}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Impact Secured</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

