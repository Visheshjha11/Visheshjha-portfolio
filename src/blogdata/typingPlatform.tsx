import React from "react";
import { BlogPostType } from "./types";

export const typingPlatformPost: BlogPostType = {
  id: 2,
  date: "MAY 18, 2026",
  title: "MOST TYPING PLATFORMS IGNORE DEVELOPERS. SO I BUILT MY OWN.",
  excerpt: "Just an story about how I built Velocitydev",
  tags: ["BUILD IN PUBLIC", "PRODUCTIVITY"],
  link: "/blog/VelocityDev",
  isInternal: true,
  content: (
    <>
      {/* <p className="mb-6">Building Velocitydev turned into an unexpected obsession with developer experience, latency, and interaction design.</p> */}
      
      <p className="mb-6"><a href="https://velocitydev-v1.vercel.app/" target="_blank" rel="noreferrer" className="text-black/80 hover:text-black underline underline-offset-4">https://velocitydev-v1.vercel.app/</a></p>

      <img src="/blog/velocity-1.png" alt="Velocitydev Dashboard" className="w-full rounded-xl shadow-lg border border-black/10 my-10" />

      <p className="mb-6">Most typing websites train you to type English faster.</p>
      <p className="mb-6">Developers don’t spend their day typing English.</p>
      
      <p className="mb-6">We type:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>brackets</li>
        <li>imports</li>
        <li>chained methods</li>
        <li>regex we barely understand</li>
        <li>variable names that somehow became permanent</li>
        <li>broken code at 2:13 AM</li>
      </ul>

      <p className="mb-6">And after years of using traditional typing platforms, I realized something strange:</p>
      <p className="mb-6">They were improving my typing speed.</p>
      <p className="mb-12">But not my coding flow.</p>

      <p className="mb-6">That frustration eventually became Velocitydev - a typing platform built specifically for developers.</p>
      <p className="mb-6">At first, I thought this would be a small weekend project.</p>
      <p className="mb-12">Then I spent hours tweaking cursor animations by 40 milliseconds.</p>

      <img src="/blog/velocity-2.png" alt="Velocitydev Typing Interface" className="w-full rounded-xl shadow-lg border border-black/10 my-10" />

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        The Moment the Idea Clicked
      </h2>
      <p className="mb-6">The realization happened while I was practicing on a popular typing website between coding sessions.</p>
      <p className="mb-6">According to the platform, I was getting faster every week.</p>
      <p className="mb-6">Then I’d return to my editor and still hesitate while typing things like:</p>
      
      <div className="bg-black/5 p-4 rounded-lg font-mono text-sm mb-6 border border-black/10">
        <code>const userData = await fetch("/api/user")</code>
      </div>

      <p className="mb-6">Because coding isn’t normal typing.</p>
      <p className="mb-6">Your brain constantly switches between:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>symbols</li>
        <li>indentation</li>
        <li>syntax structure</li>
        <li>visual scanning</li>
        <li>autocomplete expectations</li>
        <li>logical grouping</li>
      </ul>

      <p className="mb-6">Typing code feels closer to playing an instrument than writing sentences.</p>
      <p className="mb-6">And suddenly every traditional typing platform felt weirdly disconnected from how developers actually work.</p>
      <p className="mb-12">That was the starting point.</p>

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        The First Version Felt Technically Correct and Emotionally Dead
      </h2>
      <p className="mb-6">The first prototype worked.</p>
      <p className="mb-6">Which honestly made it more frustrating.</p>
      <p className="mb-6">I had:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>code rendering</li>
        <li>accuracy tracking</li>
        <li>typing logic</li>
        <li>WPM calculations</li>
        <li>syntax highlighting</li>
      </ul>

      <p className="mb-6">On paper, everything looked fine.</p>
      <p className="mb-6">But using it felt terrible.</p>
      <p className="mb-6">The UI felt like a productivity dashboard pretending to be a developer tool.</p>
      <p className="mb-6">And developers are unusually sensitive to bad interfaces.</p>
      <p className="mb-6">They instantly notice:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>latency</li>
        <li>awkward spacing</li>
        <li>inconsistent animations</li>
        <li>keyboard interruptions</li>
        <li>visual clutter</li>
        <li>cursor movement that feels “off”</li>
      </ul>

      <p className="mb-6">At one point, I reduced a typing transition from 220ms to 140ms.</p>
      <p className="mb-6">Suddenly the platform stopped feeling sluggish.</p>
      <p className="mb-6">That tiny difference completely changed the experience.</p>
      <p className="mb-6">Which sounds irrational until you realize typing is continuous interaction.</p>
      <p className="mb-6">A 40ms delay feels invisible in dashboards and unbearable while typing.</p>
      <p className="mb-6">That realization changed the entire direction of the project.</p>
      <p className="mb-6">Velocitydev stopped being a typing website.</p>
      <p className="mb-12">It became an obsession with interaction quality.</p>

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        Then I Accidentally Entered UX Hell
      </h2>
      <p className="mb-6">I underestimated how difficult it is to make software feel fast.</p>
      <p className="mb-6">Not benchmark fast.</p>
      <p className="mb-6">Human fast.</p>
      <p className="mb-6">There’s a huge difference.</p>
      <p className="mb-6">I rebuilt the typing input system multiple times because something always felt slightly wrong.</p>
      <p className="mb-6">Not broken.</p>
      <p className="mb-6">Wrong.</p>
      
      <p className="mb-6">One version had technically better performance metrics but somehow felt slower while typing quickly.</p>
      <p className="mb-6">Another version looked smoother visually but introduced tiny input inconsistencies during rapid keystrokes.</p>
      <p className="mb-6">Most users would never consciously identify those problems.</p>
      <p className="mb-6">But they’d feel them immediately.</p>
      <p className="mb-6">And developers especially notice friction.</p>

      <p className="mb-6">That’s the weird thing about developer tools:</p>
      <p className="mb-6">People may not remember your stack.</p>
      <p className="mb-12">But they remember how your product made them feel.</p>

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        Everything Felt Smooth Until the Backend Entered the Picture
      </h2>
      <p className="mb-6">The frontend was the fun part.</p>
      <p className="mb-6">Typing felt responsive.</p>
      <p className="mb-6">Animations were smooth.</p>
      <p className="mb-6">The platform finally started feeling like an actual developer tool instead of a generic typing website.</p>
      <p className="mb-6">Then I added persistence.</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Leaderboards.</li>
        <li>Typing history.</li>
        <li>Session tracking.</li>
        <li>Performance metrics.</li>
      </ul>

      <p className="mb-6">And suddenly the project became much more interesting technically.</p>
      <p className="mb-6">Because typing platforms are unusually sensitive to latency.</p>
      <p className="mb-6">A delayed dashboard refresh is acceptable.</p>
      <p className="mb-6">A delayed typing interaction feels broken instantly.</p>
      <p className="mb-6">That forced me to rethink how the backend should behave entirely.</p>
      
      <p className="mb-6">I had to carefully decide:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>what should happen client-side</li>
        <li>what deserved immediate persistence</li>
        <li>how often metrics should sync</li>
        <li>when backend updates should happen without interrupting flow</li>
      </ul>

      <p className="mb-6">One issue I ran into early was syncing typing accuracy correctly during very fast sessions.</p>
      <p className="mb-6">The frontend calculations were immediate.</p>
      <p className="mb-6">But backend updates occasionally introduced inconsistencies during rapid typing bursts.</p>
      <p className="mb-6">At first, I treated it like a small bug.</p>
      <p className="mb-6">It wasn’t.</p>
      
      <p className="mb-6">It exposed a much bigger problem:</p>
      <p className="mb-6">I was thinking about backend architecture separately from user experience.</p>
      <p className="mb-6 font-bold">But in highly interactive products, backend decisions are UX decisions.</p>

      <p className="mb-6">So instead of forcing every interaction through the server, I redesigned parts of the system around responsiveness first:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>keeping active typing state client-side</li>
        <li>batching certain updates intelligently</li>
        <li>reducing unnecessary backend calls</li>
        <li>prioritizing interaction smoothness over constant synchronization</li>
      </ul>

      <p className="mb-6">And the difference was immediate.</p>
      <p className="mb-6">The platform stopped feeling like a website communicating with a backend.</p>
      <p className="mb-6">It started feeling fluid.</p>
      <p className="mb-6">That entire process changed how I think about full-stack engineering.</p>
      <p className="mb-6">Before this project, I mostly viewed backend systems through:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>scalability</li>
        <li>structure</li>
        <li>architecture</li>
      </ul>

      <p className="mb-6">Now I think a huge part of backend engineering is invisible:</p>
      <p className="mb-6">Protecting user flow.</p>
      <p className="mb-12">Especially in products where milliseconds affect how the experience feels.</p>

      <img src="/blog/velocity-3.png" alt="Velocitydev Modes" className="w-full rounded-xl shadow-lg border border-black/10 my-10" />

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        I Made the Classic Engineer Mistake
      </h2>
      <p className="mb-6">I thought more features would make the product feel more impressive.</p>
      <p className="mb-6">So naturally I started adding:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>extra statistics</li>
        <li>additional panels</li>
        <li>more settings</li>
        <li>more metrics</li>
        <li>more UI everywhere</li>
      </ul>

      <p className="mb-6">And the product got worse every single time.</p>
      <p className="mb-6">The interface became heavier.</p>
      <p className="mb-6">The experience became noisy.</p>
      <p className="mb-6">The focus disappeared.</p>
      <p className="mb-6">At one point, I opened the app and realized I had accidentally built the exact kind of bloated interface I originally disliked.</p>
      <p className="mb-6">That moment hurt a little.</p>
      <p className="mb-6">Because removing features is psychologically harder than building them.</p>
      <p className="mb-6">Engineers love adding.</p>
      <p className="mb-12 font-bold">Good products usually improve through subtraction.</p>

      <p className="mb-6">So I started aggressively simplifying everything.</p>
      <p className="mb-12">And ironically, the simpler the platform became, the more professional it started feeling.</p>

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        The Biggest Surprise Wasn’t Technical
      </h2>
      <p className="mb-6">I expected engineering challenges.</p>
      <p className="mb-6">I didn’t expect how deeply this project would change how I think about software.</p>
      <p className="mb-6">Before Velocitydev, I mostly viewed great engineering as:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>architecture</li>
        <li>scalability</li>
        <li>clean abstractions</li>
        <li>performance optimization</li>
      </ul>

      <p className="mb-6">Now I think a huge part of software quality is invisible.</p>
      <p className="mb-6">It’s:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>responsiveness</li>
        <li>rhythm</li>
        <li>interaction smoothness</li>
        <li>cognitive load</li>
        <li>visual balance</li>
        <li>flow preservation</li>
      </ul>

      <p className="mb-6">Tiny UX decisions compound into emotional experience.</p>
      <p className="mb-6">And developers spend thousands of hours inside interfaces.</p>
      <p className="mb-6">Which means they subconsciously develop extremely high standards.</p>
      <p className="mb-6">That’s why some tools feel addictive to use while others feel exhausting after ten minutes.</p>
      <p className="mb-6">The difference usually isn’t features.</p>
      <p className="mb-12">It’s friction.</p>

      <h2 className="text-3xl md:text-4xl font-poster font-bold tracking-wide uppercase mb-8 flex items-center gap-4 mt-16">
        <span className="w-8 h-[2px] bg-[#0a0a0a] inline-block shrink-0"></span>
        Most Developer Tools Still Underestimate This
      </h2>
      <p className="mb-6">A lot of software today feels optimized for screenshots instead of workflows.</p>
      <p className="mb-6">Everything looks impressive in product demos.</p>
      <p className="mb-6">Then you actually use it for an hour.</p>
      <p className="mb-6">And suddenly:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>animations feel excessive</li>
        <li>interfaces feel crowded</li>
        <li>workflows feel interrupted</li>
        <li>performance inconsistencies become exhausting</li>
      </ul>

      <p className="mb-6">I didn’t want Velocitydev to feel like that.</p>
      <p className="mb-6">I wanted it to feel invisible.</p>
      <p className="mb-6">Fast enough that your brain stays focused on typing instead of the interface itself.</p>
      <p className="mb-6">That became the real product philosophy.</p>
      <p className="mb-6">Not “more features.”</p>
      <p className="mb-12 font-bold">Less friction.</p>

      <p className="mb-6">Velocitydev started as a small idea:</p>
      <p className="mb-6 italic">“Typing practice, but for developers.”</p>

      <p className="mb-6">Somewhere during development, it became an accidental deep dive into:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>developer psychology</li>
        <li>interaction design</li>
      </ul>

      <p className="mb-6">And honestly, that surprised me more than the technical complexity itself.</p>
      <p className="mb-6">Because the hardest part wasn’t building the platform.</p>
      <p className="mb-6">It was making it feel right.</p>
      <p className="mb-6">That’s a very different problem.</p>
      <p className="mb-6">And I think that’s what separates memorable developer tools from forgettable ones.</p>
      <p className="mb-6">Users rarely remember feature lists.</p>
      <p className="mb-12">They remember how your product felt on a random Tuesday night while they were deep in flow.</p>

      <p className="mb-6 font-bold">If you want to try it:</p>
      <p className="mb-6"><a href="https://velocitydev-v1.vercel.app/" target="_blank" rel="noreferrer" className="text-black/80 hover:text-black underline underline-offset-4">Velocitydev - https://velocitydev-v1.vercel.app/</a></p>
    </>
  )
};
