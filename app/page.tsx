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
  const artefacts = (manifestData.artefacts as Artefact[])
    .filter((a) => !a.has_password)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <header className="bg-[#002040]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-medium text-base tracking-tight">dotfound</span>
          <span className="text-[#cee4ff] text-sm font-light">artefacts</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {artefacts.length === 0 ? (
          <p className="text-[#767676] font-light text-sm">No artefacts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {artefacts.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Live iframe preview */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#e8e8e8] border-b border-[#e0e0e0]">
                  <iframe
                    src={`/a/${a.slug}.html`}
                    title={a.title}
                    className="w-[200%] h-[200%] origin-top-left pointer-events-none"
                    style={{ transform: 'scale(0.5)' }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    tabIndex={-1}
                  />

                  {/* Hover arrow */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#002040]/0 group-hover:bg-[#002040]/40 transition-all duration-200">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>


                </div>

                {/* Card info */}
                <div className="px-4 py-3">
                  <h2 className="text-[#002040] font-medium text-sm leading-snug group-hover:text-[#5400ff] transition-colors truncate">
                    {a.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1.5 text-[#767676] text-xs font-light">
                    <span>{typeLabel[a.type] ?? a.type}</span>
                    <span className="text-[#d0d0d0]">·</span>
                    <span>
                      {new Date(a.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
