import React from "react";

export const veronicaRole = [
  "AI Engineer",
  "Software Developer",
  "System Designer"
];

export const veronicaTimeline = "First Semester of College (2024)";

export const veronicaPlatform = "Desktop AI Agent";

export const veronicaSections = [
  {
    title: "Overview",
    content: (
      <>
        <p className="mb-6">Before agentic AI became a buzzword, I wanted to answer a simple question:</p>
        <p className="mb-6 italic">"What if my computer could actually understand what I wanted and do it for me?"</p>
        <p className="mb-6">That curiosity led me to build Veronica during my first semester of college.</p>
        <p className="mb-6">Unlike traditional voice assistants that simply answer questions, Veronica was designed to execute tasks. It could listen to spoken commands, understand intent, launch applications, search the web, automate repetitive workflows, retrieve information, and coordinate multiple actions—all through natural conversation.</p>
        <p className="mb-6">For me, Veronica wasn't just another chatbot.</p>
        <p>It was my first attempt at building an autonomous software agent.</p>
      </>
    )
  },
  {
    title: "The Problem",
    content: (
      <>
        <p className="mb-6">Voice assistants available at the time were heavily restricted. They could answer simple questions but struggled with meaningful desktop automation.</p>
        <p className="mb-6">If a user wanted to open applications, search files, automate browser actions, or perform multiple steps from a single instruction, the interaction quickly broke down.</p>
        <p className="mb-6">I wanted an assistant that didn't just respond.</p>
        <p>I wanted one that acted.</p>
      </>
    )
  },
  {
    title: "Solution",
    content: (
      <>
        <p className="mb-6">Veronica combines speech recognition, natural language processing, desktop automation, and cloud AI services into a unified agent capable of executing real-world computer tasks.</p>
        <p className="mb-6">A single command like:</p>
        <p className="mb-6 italic text-[#0a0a0a]/80 font-mono">"Open Chrome, search for Python documentation, and summarize the first result."</p>
        <p className="mb-6">could trigger an entire workflow without additional user interaction.</p>
        <p>Instead of waiting for individual commands, Veronica interpreted intent, selected the required tools, and completed multi-step tasks autonomously.</p>
      </>
    )
  },
  {
    title: "What Made Veronica Different",
    content: (
      <>
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Natural Voice Conversations</h3>
        <p className="mb-6">Users interacted entirely through speech using continuous voice recognition and text-to-speech responses.</p>

        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Autonomous Task Execution</h3>
        <p className="mb-6">Veronica could launch applications, browse websites, automate repetitive actions, and control the operating system without manual input.</p>

        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Multi-Step Reasoning</h3>
        <p className="mb-6">Rather than executing isolated commands, Veronica chained multiple actions together to accomplish higher-level goals.</p>

        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Tool Integration</h3>
        <p className="mb-6">The assistant combined browser automation, desktop control, cloud APIs, and custom Python modules into a single workflow engine.</p>

        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Real-Time Information</h3>
        <p>Weather, web searches, calculations, and online information could all be retrieved dynamically during conversations.</p>
      </>
    )
  },
  {
    title: "Technical Highlights",
    content: (
      <>
        <p className="mb-6">The project brought together multiple AI and automation technologies into one application. Core capabilities included:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Speech-to-Text processing</li>
          <li>Natural Language Processing</li>
          <li>Text-to-Speech synthesis</li>
          <li>Desktop automation & Browser automation</li>
          <li>Google Cloud integrations</li>
          <li>Modular command routing</li>
          <li>Custom automation engine</li>
        </ul>
        <p>Every capability functioned as an independent module, allowing Veronica to continuously expand with new skills over time.</p>
      </>
    )
  },
  {
    title: "Challenges",
    content: (
      <>
        <p className="mb-6">The biggest challenge wasn't speech recognition. It was orchestrating different systems into one seamless experience.</p>
        <p>Voice processing, automation, browser control, and cloud APIs all had different execution models. Creating a reliable workflow engine that could coordinate them while maintaining natural conversations became the most rewarding part of the project.</p>
      </>
    )
  },
  {
    title: "Why This Project Matters",
    content: (
      <>
        <p className="mb-6">Looking back, Veronica feels remarkably similar to today's AI agents.</p>
        <p className="mb-6">Long before frameworks for autonomous agents became widely available, I was already experimenting with ideas like tool calling, intent recognition, autonomous execution, multi-step task planning, conversational interfaces, and workflow automation.</p>
        <p className="mb-6">While today's LLMs make these capabilities significantly more powerful, Veronica taught me the core principles of agent-based systems during my very first semester of college.</p>
        <p>It became the foundation for how I think about AI today—and directly influenced later projects like Saarthi, where autonomous AI orchestration became a central design principle.</p>
      </>
    )
  }
];
