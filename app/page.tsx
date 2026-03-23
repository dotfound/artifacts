import Link from 'next/link'
import manifestData from '@/data/manifest.json'

interface Artefact {
  slug: string
  title: string
  type: string
  date: string
  has_password: boolean
}

const typeLabel: Record<string, string> = {
  dashboard: 'Dashboard',
  report: 'Report',
  proposal: 'Proposal',
  other: 'Other',
}

export default function IndexPage() {
  const artefacts = (manifestData.artefacts as Artefact[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <header className="bg-[#002040]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-medium text-base tracking-tight">dotfound</span>
          <span className="text-[#cee4ff] text-sm font-light">artefacts</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {artefacts.length === 0 ? (
          <p className="text-[#767676] font-light text-sm">No artefacts published yet.</p>
        ) : (
          <div className="space-y-2">
            {artefacts.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="flex items-center justify-between bg-white rounded-lg px-5 py-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5400ff] shrink-0" />
                  <span className="text-[#002040] font-medium text-sm group-hover:text-[#5400ff] transition-colors">
                    {a.title}
                  </span>
                  {a.has_password && (
                    <span className="text-[#767676] text-xs">🔒</span>
                  )}
                </div>
                <div className="flex items-center gap-5 text-[#767676] text-xs font-light shrink-0">
                  <span>{typeLabel[a.type] ?? a.type}</span>
                  <span>
                    {new Date(a.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
