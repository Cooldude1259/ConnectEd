import GlassCard from './GlassCard';

interface FocusHubProps {
  isRestricted: boolean;
  yearLevel: number;
}

export default function FocusHub({ isRestricted, yearLevel }: FocusHubProps) {
  return (
    <GlassCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Year {yearLevel} Support
          </span>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* The EdChat Integration */}
        <div className="aspect-video w-full bg-slate-900/50 rounded-lg overflow-hidden border border-white/5">
          <iframe 
            src="https://edchat.ai/embed" // Hypothetical official EdChat embed URL
            className="w-full h-full"
            title="EdChat AI"
          />
        </div>

        {/* Cortex Suggestions (Disabled if behavior ban is active) */}
        <div className={`space-y-2 ${isRestricted ? 'opacity-50 pointer-events-none' : ''}`}>
          <p className="text-sm font-medium">Trending Topics for your Year:</p>
          <div className="flex flex-wrap gap-2">
            {['Photosynthesis', 'Algebra Basics', 'Year 9 Essay'].map(tag => (
              <button key={tag} className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition">
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}