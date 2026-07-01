import React from "react";

export const saarthiRole = [
  "Founder",
  "Full Stack Developer",
  "Product Designer",
  "AI Engineer"
];

export const saarthiTimeline = "2025 - Present";

export const saarthiPlatform = "Web Application";

export const saarthiLiveWebsite = "https://saarthi-v2.vercel.app";

export const saarthiSections = [
  {
    title: "Overview",
    content: (
      <>
        <p className="mb-6">Education today is fragmented.</p>
        <p className="mb-6">Students jump between Google Drive, WhatsApp, YouTube, ChatGPT, coding platforms, attendance calculators, PDF readers, note-taking apps, and dozens of browser tabs every single day.</p>
        <p className="mb-6">Every tool solves one problem. None of them understand the student's complete workflow.</p>
        <p className="mb-6">I wanted to challenge that. Instead of building another AI chatbot or another learning platform, I set out to design something fundamentally different—an academic operating system where every module communicates through a single intelligent AI layer.</p>
        <p className="mb-6">That vision became Saarthi.</p>
        <p>Saarthi combines AI conversations, semantic knowledge retrieval, coding practice, personalized learning, attendance prediction, and productivity tools into one connected platform where context is never lost and the user never needs to think about which application to open next.</p>
      </>
    )
  },
  {
    title: "The Problem",
    content: (
      <>
        <p className="mb-6">During university, I noticed an obvious pattern. Students rarely struggled because information didn't exist. They struggled because information existed everywhere.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Lecture notes lived inside PDFs.</li>
          <li>Assignments were shared through WhatsApp.</li>
          <li>Coding practice happened on different websites.</li>
          <li>Attendance was calculated manually.</li>
          <li>Roadmaps were bookmarked somewhere.</li>
          <li>AI conversations disappeared after every session.</li>
        </ul>
        <p className="mb-6">Every day started with searching instead of learning.</p>
        <p className="mb-6">After speaking with classmates and observing these patterns, one thing became clear: Students don't lack resources. They lack structure.</p>
        <p>The challenge wasn't building another productivity tool. The challenge was creating one system capable of organizing an entire academic journey.</p>
      </>
    )
  },
  {
    title: "Vision",
    content: (
      <>
        <p className="mb-6">The idea behind Saarthi was simple. The platform should think like a personal academic assistant rather than behave like a collection of webpages.</p>
        <p className="mb-6">Users shouldn't have to decide:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Which module should I open?</li>
          <li>Where did I save this PDF?</li>
          <li>Which website calculates attendance?</li>
          <li>Which coding platform should I use?</li>
          <li>Which AI conversation contained that answer?</li>
        </ul>
        <p className="mb-6">Instead, they should simply describe what they want. The platform should understand the intent, retrieve the required information, and execute the appropriate workflow automatically.</p>
      </>
    )
  },
  {
    title: "Product Goals",
    content: (
      <>
        <p className="mb-6">While designing Saarthi, I focused on four core objectives.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Centralize Academic Work:</strong> Replace scattered resources with one connected knowledge system.</li>
          <li><strong>Reduce Cognitive Load:</strong> Remove unnecessary navigation between multiple applications.</li>
          <li><strong>Build Around AI:</strong> Treat AI as the operating layer instead of another feature.</li>
          <li><strong>Design for Scale:</strong> Create an architecture capable of supporting future modules without major rewrites.</li>
        </ul>
      </>
    )
  },
  {
    title: "Research & Discovery",
    content: (
      <>
        <p className="mb-6">Before writing code, I identified the biggest pain points faced by students.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Fragmented Learning Resources:</strong> Notes were scattered across PDFs, screenshots, Google Drive folders and messaging applications.</li>
          <li><strong>Context Switching:</strong> Students constantly switched between coding platforms, AI assistants, attendance tools and note applications.</li>
          <li><strong>Repetitive Organization:</strong> Users repeatedly searched for the same files because nothing was organized intelligently.</li>
          <li><strong>Generic Learning:</strong> Existing educational platforms delivered identical experiences regardless of individual learning goals.</li>
        </ul>
        <p>These observations directly shaped Saarthi's architecture and module design.</p>
      </>
    )
  },
  {
    title: "Design Philosophy",
    content: (
      <>
        <p className="mb-6">Most platforms are feature-first. Saarthi is system-first.</p>
        <p className="mb-6">Instead of asking, <em>"What page should this feature live on?"</em> I asked, <em>"What capability should the AI have?"</em></p>
        <p className="mb-6">Every module became a capability accessible by the AI. This approach allows the platform to feel like one intelligent product instead of seven disconnected tools.</p>
        <p>The user interacts with one assistant. Behind the scenes, multiple modules collaborate to complete the request.</p>
      </>
    )
  },
  {
    title: "Information Architecture",
    content: (
      <>
        <p className="mb-6">Saarthi consists of seven interconnected modules.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>AI Assistant:</strong> A conversational interface capable of understanding context across multiple interactions. Rather than providing isolated answers, it remembers previous conversations and guides users through academic workflows.</li>
          <li><strong>Knowledge Vault:</strong> A semantic storage system for notes, PDFs, code snippets, documents and links. Instead of searching filenames, users retrieve information using natural language.</li>
          <li><strong>AI Roadmaps:</strong> Personalized learning paths generated according to individual goals, skill level and academic interests.</li>
          <li><strong>MCQ Generator:</strong> Automatically generates quizzes with explanations and adjustable difficulty using AI.</li>
          <li><strong>TestPad:</strong> An integrated coding environment that generates problems, evaluates submissions and tracks long-term coding progress.</li>
          <li><strong>Code Duel:</strong> A real-time multiplayer coding platform where two users solve problems simultaneously while tracking each other's progress live.</li>
          <li><strong>Leave Manager:</strong> Attendance prediction that calculates future attendance percentages and determines whether students can safely miss upcoming classes.</li>
        </ul>
        <p>Together, these modules create one continuous learning experience rather than independent products.</p>
      </>
    )
  },
  {
    title: "Building the AI Layer",
    content: (
      <>
        <p className="mb-6">One of Saarthi's biggest engineering challenges was creating memory. Large language models don't naturally remember user-specific information. To solve this, I implemented a Retrieval-Augmented Generation (RAG) pipeline.</p>
        <p className="mb-6">The workflow consists of:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Document ingestion</li>
          <li>Text chunking</li>
          <li>Vector embedding generation</li>
          <li>Pinecone vector indexing</li>
          <li>Semantic similarity search</li>
          <li>Context injection into AI prompts</li>
        </ul>
        <p className="mb-6">Instead of generating responses purely from the language model, Saarthi retrieves relevant academic knowledge before generating answers.</p>
        <p>This allows the assistant to respond using the student's own documents, notes and uploaded content rather than generic internet knowledge.</p>
      </>
    )
  },
  {
    title: "Agentic AI",
    content: (
      <>
        <p className="mb-6">Rather than behaving like a traditional chatbot, Saarthi follows an agentic workflow. The AI first determines what the user actually wants. It then identifies the appropriate module. Finally, it performs the required action automatically.</p>
        <p className="mb-6">For example: <em>"Generate DBMS quizzes"</em> automatically routes to the MCQ Generator.</p>
        <p className="mb-6">Similarly, <em>"Can I skip tomorrow's lecture?"</em> triggers attendance calculations inside Leave Manager.</p>
        <p>The AI becomes the operating system connecting every module instead of existing alongside them.</p>
      </>
    )
  },
  {
    title: "System Architecture & Backend Engineering",
    content: (
      <>
        <p className="mb-6">As Saarthi expanded, maintainability became increasingly important. The backend was designed around an MVC architecture with clear separation between Routes, Controllers, Services, Models, and Database.</p>
        <p className="mb-6">Authentication, business logic and persistence remain independent, making the platform significantly easier to extend as new modules are introduced.</p>
        <p className="mb-6">The backend powers authentication, AI orchestration, coding systems, attendance tracking and resource management through modular REST APIs. Core technologies include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Express.js</li>
          <li>MongoDB & Mongoose</li>
          <li>JWT Authentication & Google OAuth</li>
          <li>Socket.IO</li>
          <li>Multer</li>
          <li>Nodemailer</li>
          <li>Node Cron</li>
        </ul>
        <p>Business logic resides inside dedicated service layers while controllers remain lightweight request handlers, improving readability and maintainability.</p>
      </>
    )
  },
  {
    title: "Real-Time Engineering",
    content: (
      <>
        <p className="mb-6">The Code Duel module required an entirely different architecture. REST APIs weren't sufficient for synchronized coding competitions.</p>
        <p className="mb-6">Socket.IO was integrated to enable:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>room creation</li>
          <li>real-time matchmaking</li>
          <li>synchronized timers</li>
          <li>shared coding problems</li>
          <li>live test-case progress</li>
          <li>winner announcements</li>
        </ul>
        <p>This creates a multiplayer experience where both users remain synchronized throughout the entire coding session.</p>
      </>
    )
  },
  {
    title: "Authentication & Security",
    content: (
      <>
        <p className="mb-6">Security was designed from the beginning rather than added later. The platform supports:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>JWT authentication</li>
          <li>Google OAuth</li>
          <li>bcrypt password hashing</li>
          <li>password reset flows</li>
          <li>protected APIs</li>
          <li>authorization middleware</li>
          <li>secure email verification</li>
        </ul>
        <p>This creates a scalable authentication system suitable for production-ready applications.</p>
      </>
    )
  },
  {
    title: "Technical Challenges",
    content: (
      <>
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Designing Persistent AI Memory</h3>
        <p className="mb-6">Creating meaningful long-term memory required balancing retrieval quality, response speed and prompt size. Building an effective RAG pipeline involved multiple iterations before achieving reliable semantic retrieval.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Modular Architecture</h3>
        <p className="mb-6">As additional modules were introduced, tightly coupled code quickly became difficult to maintain. Separating controllers, services and models significantly improved scalability and reduced future development complexity.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Real-Time Synchronization</h3>
        <p>Maintaining synchronized timers, coding progress and multiplayer events required event-driven communication instead of traditional request-response APIs. Socket.IO solved this while maintaining low latency.</p>
      </>
    )
  },
  {
    title: "Future Scalability & Key Engineering Decisions",
    content: (
      <>
        <p className="mb-6">Several architectural decisions intentionally prioritize future growth, such as service-layer abstraction, JWT authentication, semantic vector search, scheduled background jobs, modular APIs, and hierarchical knowledge storage.</p>
        <p className="mb-6">Some of the most impactful decisions made during development include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Using a service layer to isolate business logic</li>
          <li>Choosing JWT over session-based authentication</li>
          <li>Implementing Retrieval-Augmented Generation for contextual AI</li>
          <li>Using Socket.IO for multiplayer collaboration</li>
          <li>Building reusable REST APIs</li>
          <li>Designing independent feature modules</li>
          <li>Separating AI orchestration from presentation logic</li>
        </ul>
        <p>Each decision prioritized long-term maintainability over short-term convenience.</p>
      </>
    )
  },
  {
    title: "Results",
    content: (
      <>
        <p className="mb-6">Saarthi evolved from an AI assistant into a complete academic ecosystem.</p>
        <p className="mb-6">The platform now provides:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>AI conversations with contextual memory</li>
          <li>Semantic knowledge retrieval</li>
          <li>AI-generated roadmaps</li>
          <li>Coding practice environment</li>
          <li>Multiplayer coding competitions</li>
          <li>Attendance forecasting</li>
          <li>AI-powered quiz generation</li>
        </ul>
        <p>More importantly, every module communicates through one unified AI layer instead of functioning as isolated applications.</p>
      </>
    )
  }
];
