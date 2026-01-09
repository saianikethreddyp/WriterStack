import Link from 'next/link';
import { Layers, Globe, Code, ArrowRight, BarChart, Zap, Shield, Check, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Layers className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">WriterStack</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">Features</Link>
              <Link href="#solutions" className="text-sm font-medium text-gray-500 hover:text-gray-900">Solutions</Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900">Pricing</Link>
              <Link href="/auth/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Log in</Link>
              <Link href="/auth/register" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">New: Analytics 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            The Headless CMS for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Performance Obsessed Teams
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            Manage content in a beautiful dashboard. Deliver it anywhere via our global, edge-cached API. Built for the modern web.
          </p>

          <div className="flex justify-center gap-4 mb-20">
            <Link href="/auth/register" className="flex items-center bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#code" className="flex items-center bg-white text-gray-700 border border-gray-200 px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-50 transition">
              Read Documentation
            </Link>
          </div>

          {/* Social Proof */}
          <div className="border-t border-gray-100 pt-10">
            <p className="text-sm text-gray-500 font-medium mb-6">TRUSTED BY DEVELOPERS AT</p>
            <div className="flex justify-center flex-wrap gap-8 opacity-50 grayscale">
              {/* Placeholders for logos (Text for now) */}
              <span className="text-xl font-bold text-gray-400">ACME Corp</span>
              <span className="text-xl font-bold text-gray-400">GlobalBank</span>
              <span className="text-xl font-bold text-gray-400">NextGen</span>
              <span className="text-xl font-bold text-gray-400">Stripe-ish</span>
              <span className="text-xl font-bold text-gray-400">Vercel-ish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Core Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to ship faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Block - Analytics */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-500 mb-6">Track views, API hits, and content performance instantly.</p>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 h-48 flex items-end justify-between px-8 pb-0 overflow-hidden">
                {[40, 70, 50, 90, 60, 80, 95].map((h, i) => (
                  <div key={i} className="w-8 bg-indigo-500/80 rounded-t-md" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

            {/* Medium Block - API */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Terminal className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rest API</h3>
              <p className="text-gray-500 mb-4">RESTful endpoints for easy integration with any framework.</p>
              <div className="bg-gray-900 rounded-md p-3">
                <code className="text-xs text-green-400 font-mono">GET /api/v1/articles</code>
              </div>
            </div>

            {/* Medium Block - Security */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure by Default</h3>
              <p className="text-gray-500">
                API keys, per-user isolation, and encrypted data storage.
              </p>
            </div>

            {/* Large Block - Editor */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Public Blogs</h3>
                  <p className="text-gray-500">Instantly hosted public profiles for every user.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500 font-mono">
                  writerstack.com/username
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Showcase Section */}
      <section id="code" className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">Designed for Developers</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Forget complex SDKs. Just use standard HTTP requests to fetch your content.
                It works with Next.js, React, Vue, Svelte, or vanilla JS.
              </p>
              <ul className="space-y-4 mb-8">
                {['Type-safe API responses', 'Edge-cached performance', 'Markdown support'].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
                Read the API Docs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Code Block */}
            <div className="mt-12 lg:mt-0 bg-black/50 rounded-xl border border-gray-800 p-6 shadow-2xl backdrop-blur-sm font-mono text-sm">
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-300">
                <p><span className="text-purple-400">const</span> <span className="text-blue-400">res</span> = <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(</p>
                <p className="pl-4">'https://writerstack.com/api/v1/articles',</p>
                <p className="pl-4">{'{'}</p>
                <p className="pl-8">headers: {'{'}</p>
                <p className="pl-12">'X-API-KEY': <span className="text-green-400">'sk_live_...'</span></p>
                <p className="pl-8">{'}'}</p>
                <p className="pl-4">{'}'}</p>
                <p>);</p>
                <p className="mt-4"><span className="text-purple-400">const</span> <span className="text-blue-400">data</span> = <span className="text-purple-400">await</span> <span className="text-blue-400">res</span>.<span className="text-yellow-400">json</span>();</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Personal vs Company */}
      <section id="solutions" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              One Platform, Two Powerful Ways to Use It
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Whether you need a full website or just a backend, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Personal Use Case */}
            <div className="relative group bg-gray-50 rounded-3xl p-8 border border-gray-200 overflow-hidden hover:border-indigo-200 transition-all">
              <div className="relative z-10">
                <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Personal Portfolios</h3>
                <p className="text-gray-500 mb-8 h-12">
                  Launch a professional blog in seconds. No coding required. We host everything for you.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-indigo-500 mr-3" />
                    Your own <strong>writerstack.com/you</strong>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-indigo-500 mr-3" />
                    Built-in SEO & Analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-indigo-500 mr-3" />
                    Zero configuration needed
                  </li>
                </ul>
                <div className="mt-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transform group-hover:-translate-y-1 transition duration-500">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        JD
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-gray-100 rounded mb-1"></div>
                        <div className="h-2 w-16 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-24 bg-gray-100 rounded mb-3"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                    <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Use Case */}
            <div className="relative group bg-gray-900 rounded-3xl p-8 border border-gray-800 overflow-hidden text-white hover:border-gray-700 transition-all">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-gray-800 rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">For Engineering Teams</h3>
                <p className="text-gray-400 mb-8 h-12">
                  Use as a Headless CMS. Fetch content via API and render it on your corporate Next.js site.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-indigo-400 mr-3" />
                    Integrate into <strong>yourcompany.com</strong>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-indigo-400 mr-3" />
                    Full brand control (Custom CSS/UI)
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-indigo-400 mr-3" />
                    Team collaboration tools
                  </li>
                </ul>
                <div className="mt-8">
                  <div className="bg-black rounded-lg border border-gray-800 p-4 font-mono text-xs text-gray-400 transform group-hover:-translate-y-1 transition duration-500">
                    <div><span className="text-purple-400">export default</span> <span className="text-purple-400">async</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">Blog</span>() {'{'}</div>
                    <div className="pl-4"><span className="text-gray-500">// Fetch from WriterStack API</span></div>
                    <div className="pl-4"><span className="text-purple-400">const</span> posts = <span className="text-purple-400">await</span> <span className="text-yellow-400">getArticles</span>();</div>
                    <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                    <div className="pl-8 text-green-400">&lt;CompanyLayout&gt;</div>
                    <div className="pl-12 text-green-400">&lt;BlogGrid items={'{posts}'} /&gt;</div>
                    <div className="pl-8 text-green-400">&lt;/CompanyLayout&gt;</div>
                    <div className="pl-4">);</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              From Draft to Deploy in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              A simple workflow for developers who love to write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-100 -z-10"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-6">
                <span className="text-3xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Write Content</h3>
              <p className="text-gray-500">
                Create articles in our beautiful notion-style editor with markdown support.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-purple-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-6">
                <span className="text-3xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get API Key</h3>
              <p className="text-gray-500">
                Generate a secure API key from your dashboard to access your content programmatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-6">
                <span className="text-3xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Render Anywhere</h3>
              <p className="text-gray-500">
                Fetch articles via REST API and display them on your Next.js, React, or mobile app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is it really free?</h3>
              <p className="text-gray-600">Yes! We are currently launching as a free service for everyone. You get unlimited articles, API requests, and projects.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I use this for my company blog?</h3>
              <p className="text-gray-600">Absolutely. The API is designed to be robust enough for production corporate blogs, documentation sites, and engineering logs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you support custom domains?</h3>
              <p className="text-gray-600">For the "Public Blog" feature, we currently host on <strong>writerstack.com/you</strong>. For custom domains, we recommend using our Headless API to build your own site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden bg-gray-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-gray-900 to-gray-900"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Ready to start writing?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers building the next generation of content-driven applications. Free forever.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-xl">
              Get Started for Free
            </Link>
            <Link href="/auth/login" className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition">
              Log in
            </Link>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center mb-4 md:mb-0">
            <Layers className="h-5 w-5 text-gray-400 mr-2" />
            <span className="font-semibold text-gray-900">WriterStack</span>
            <span className="mx-3">•</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-gray-900">Terms</Link>
            <Link href="#" className="hover:text-gray-900">Privacy</Link>
            <Link href="#" className="hover:text-gray-900">Twitter</Link>
            <Link href="#" className="hover:text-gray-900">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
