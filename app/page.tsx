import Link from 'next/link'

export default function Home() {
  return (
    <main className="pattern relative">
      <section className="container relative mx-auto grid min-h-[680px] items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-0">
        <div className="relative z-10">
          <div className="eyebrow mb-5">A better beginning</div>

          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Find a marriage built on
            <span className="gold-text"> faith and intention.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/75">
            Muslim Match helps sincere people connect respectfully, with privacy,
            values, and family involvement at the heart of the journey.
          </p>
        </div>

        <div className="relative z-10">
          <div className="glass-card p-5">
            <div className="rounded-[20px] bg-gradient-to-br from-emerald-700 to-emerald-950 p-10 text-center">
              <div className="mx-auto grid h-56 w-56 place-items-center rounded-full border border-amber-300/40 bg-amber-300/10">
                <div>
                  <div className="text-7xl text-amber-300">☾</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.3em] text-amber-100">
                    Niyyah
                  </div>
                </div>
              </div>

              <p className="mt-10 text-sm leading-7 text-emerald-100/75">
                Sincere connections. Respectful conversations. Purposeful beginnings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container relative mx-auto grid gap-5 px-4 pb-20 md:grid-cols-3 lg:px-0">
        <div className="glass-card p-7 transition-transform duration-300 hover:-translate-y-1">
          <div className="mb-4 text-3xl text-amber-300">☾</div>
          <h2 className="text-xl font-bold text-white">Halal by design</h2>
          <p className="mt-3 leading-7 text-emerald-100/65">
            A respectful experience centered around sincere marriage intentions.
          </p>
        </div>

        <div className="glass-card p-7 transition-transform duration-300 hover:-translate-y-1">
          <div className="mb-4 text-3xl text-amber-300">◇</div>
          <h2 className="text-xl font-bold text-white">Family-aware</h2>
          <p className="mt-3 leading-7 text-emerald-100/65">
            Keep guardians and families involved when the time is right.
          </p>
        </div>

        <div className="glass-card p-7 transition-transform duration-300 hover:-translate-y-1">
          <div className="mb-4 text-3xl text-amber-300">✦</div>
          <h2 className="text-xl font-bold text-white">Values focused</h2>
          <p className="mt-3 leading-7 text-emerald-100/65">
            Discover meaningful compatibility beyond surface-level matching.
          </p>
        </div>
      </section>
    </main>
  )
}