import React, { useState, useEffect } from "react";
import { sampleProjects } from "./sampleData";

export default function App() {
  // Required states
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stakeholderData, setStakeholderData] = useState(null);
  const [activeTab, setActiveTab] = useState("register");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("stakeholder_iq_key") || "");
  const [showApiModal, setShowApiModal] = useState(false);
  
  // Custom API integration states
  const [apiError, setApiError] = useState(null);

  // Advanced custom state for high premium feel (matrix details sidebar)
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [inputKey, setInputKey] = useState(""); // Temporary state inside modal

  // Character limit validation
  const CHAR_LIMIT = 3000;

  // Initialize modal field when opened
  useEffect(() => {
    if (showApiModal) {
      setInputKey(apiKey);
    }
  }, [showApiModal, apiKey]);

  // Set default selected stakeholder when data is loaded
  useEffect(() => {
    if (stakeholderData && stakeholderData.stakeholders && stakeholderData.stakeholders.length > 0) {
      setSelectedStakeholder(stakeholderData.stakeholders[0]);
    } else {
      setSelectedStakeholder(null);
    }
  }, [stakeholderData]);

  // Load a sample project
  const handleLoadSample = (e) => {
    e.preventDefault();
    // Load Green Valley Health Patient Portal as the standard showcase sample
    const sample = sampleProjects[0];
    setInputText(sample.description);
  };

  // Simulate or Call Anthropic AI stakeholder mapping process
  const handleMapStakeholders = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setApiError(null);

    // MOCK MODE FALLBACK: If no key configured, keep existing mock/sample data mode
    if (!apiKey) {
      setTimeout(() => {
        const lowerInput = inputText.toLowerCase();
        let matchedProject = sampleProjects[0]; // Patient Portal default

        if (lowerInput.includes("crm") || lowerInput.includes("salesforce") || lowerInput.includes("pipeline")) {
          matchedProject = sampleProjects[1]; // CRM Standardization
        }

        setStakeholderData(matchedProject);
        setIsLoading(false);
        setActiveTab("register");
      }, 1500);
      return;
    }

    // AI MODE: Call Anthropic API directly
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a senior Business Analyst and stakeholder management expert. Analyse the following project description and return ONLY a JSON object with no markdown, no explanation, no code blocks.

Project Description: ${inputText}

Return this exact JSON structure:
{
  projectTitle: string,
  summary: string,
  stakeholders: [{
    id: string,
    name: string,
    role: string,
    department: string,
    power: 'High' | 'Medium' | 'Low',
    interest: 'High' | 'Medium' | 'Low',
    x: number (0-100, represents interest axis),
    y: number (0-100, represents power axis),
    stance: 'Champion' | 'Supporter' | 'Neutral' | 
            'Resistor' | 'Blocker',
    strategy: string,
    frequency: string
  }],
  communicationPlan: [{
    id: string,
    activity: string,
    stakeholders: [string],
    channel: string,
    frequency: string,
    objective: string
  }],
  riskRegister: [{
    id: string,
    risk: string,
    impact: 'Critical' | 'High' | 'Medium' | 'Low',
    probability: 'High' | 'Medium' | 'Low',
    mitigation: string,
    owner: string
  }]
}`
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP Server error ${response.status}. Please check your key configuration and network.`);
      }

      const responseJson = await response.json();
      if (!responseJson.content || responseJson.content.length === 0) {
        throw new Error("No response content returned by Claude AI.");
      }

      const responseText = responseJson.content[0].text;
      
      // Clean up markdown markers if present in the raw text response
      let cleanText = responseText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```[a-zA-Z]*\n/, "");
        cleanText = cleanText.replace(/\n```$/, "");
      }

      const parsedData = JSON.parse(cleanText.trim());
      setStakeholderData(parsedData);
      setActiveTab("register");
    } catch (err) {
      console.error("AI Mapping failed:", err);
      setApiError(err.message || "Failed to communicate with Anthropic AI servers.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save API Key in state and localStorage
  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setApiKey(inputKey);
    localStorage.setItem("stakeholder_iq_key", inputKey);
    setShowApiModal(false);
  };

  // Clear API Key
  const handleRemoveApiKey = () => {
    setApiKey("");
    localStorage.removeItem("stakeholder_iq_key");
    setShowApiModal(false);
  };

  // Export current stakeholder report to a clean, professionally formatted .txt file
  const handleDownloadReport = () => {
    if (!stakeholderData) return;

    const projectTitle = stakeholderData.projectTitle || stakeholderData.title || "Project";
    const projectDesc = stakeholderData.summary || stakeholderData.description || "";

    // Date formatting helper: DD/MM/YYYY
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const fileDateStr = `${day}_${month}_${year}`;

    // Quadrant calculator helper
    const getQuadrant = (power, interest) => {
      const isHighPower = power === "High" || power === "Medium";
      const isHighInterest = interest === "High" || interest === "Medium";

      if (isHighPower && isHighInterest) return "Manage Closely";
      if (isHighPower && !isHighInterest) return "Keep Satisfied";
      if (!isHighPower && isHighInterest) return "Keep Informed";
      return "Monitor";
    };

    // Construct text contents
    let text = `=====================================================
STAKEHOLDERIQ REPORT: ${projectTitle}
Date Generated: ${formattedDate}
=====================================================

PROJECT DESCRIPTION:
${projectDesc}

-----------------------------------------------------
1. STAKEHOLDER REGISTER
-----------------------------------------------------
`;

    stakeholderData.stakeholders.forEach((sh) => {
      text += `Name: ${sh.name}
Role: ${sh.role}
Department: ${sh.department}
Stance: ${sh.stance}
Power: ${sh.power} | Interest: ${sh.interest}
Engagement Frequency: ${sh.frequency}
Strategy: ${sh.strategy}

`;
    });

    text += `-----------------------------------------------------
2. POWER/INTEREST MATRIX POSITIONS
-----------------------------------------------------
`;

    stakeholderData.stakeholders.forEach((sh) => {
      const quadrant = getQuadrant(sh.power, sh.interest);
      text += `${sh.name} — Power: ${sh.power}, Interest: ${sh.interest}
Quadrant: ${quadrant}

`;
    });

    text += `-----------------------------------------------------
3. COMMUNICATION PLAN
-----------------------------------------------------
`;

    stakeholderData.communicationPlan.forEach((comm) => {
      text += `Activity: ${comm.activity}
Stakeholders: ${comm.stakeholders.join(", ")}
Channel: ${comm.channel}
Frequency: ${comm.frequency}
Objective: ${comm.objective}

`;
    });

    text += `-----------------------------------------------------
4. RISK REGISTER
-----------------------------------------------------
`;

    stakeholderData.riskRegister.forEach((risk) => {
      text += `Risk ID: ${risk.id}
Risk: ${risk.risk}
Impact: ${risk.impact} | Probability: ${risk.probability}
Owner: ${risk.owner}
Mitigation: ${risk.mitigation}

`;
    });

    text += `=====================================================
Generated by StakeholderIQ — Stakeholder Intelligence 
& Communication Planning Platform
=====================================================`;

    // Modern client-side text download trigger
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", url);

    // Named exactly: StakeholderReport_[projectTitle]_[date].txt
    const cleanTitle = projectTitle.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_");
    const fileName = `StakeholderReport_${cleanTitle}_${fileDateStr}.txt`;
    
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <header className="header-nav">
        <div className="nav-wrapper">
          <a href="#" className="logo-section">
            <div className="logo-icon-container">
              {/* Premium network/nodes SVG */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <circle cx="5" cy="5" r="2" />
                <line x1="17.6" y1="6.4" x2="13.4" y2="10.6" />
                <line x1="6.4" y1="17.6" x2="10.6" y2="13.4" />
                <line x1="17.6" y1="17.6" x2="13.4" y2="13.4" />
                <line x1="6.4" y1="6.4" x2="10.6" y2="10.6" />
              </svg>
            </div>
            <span className="logo-text">StakeholderIQ</span>
          </a>

          <p className="nav-tagline">Know Your Stakeholders. Win Every Project.</p>

          <button 
            className={`btn-api-config ${apiKey ? "active" : ""}`}
            onClick={() => setShowApiModal(true)}
            id="btn-configure-api"
          >
            {apiKey ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                API Configured
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Configure API Key
              </>
            )}
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <span className="badge-platform">Stakeholder Intelligence Platform</span>
          <h1 className="hero-title">Map Every Stakeholder.<br />Plan Every Conversation.</h1>
          <p className="hero-subtitle">
            Paste your project description and get a complete stakeholder map, Power/Interest matrix, communication strategies, and risk register instantly.
          </p>
        </section>

        {/* INPUT CARD */}
        <div className="input-card">
          <div className="textarea-container">
            <textarea
              className="project-textarea"
              placeholder="Describe your project, its goals, affected departments, and key decision makers..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, CHAR_LIMIT))}
              disabled={isLoading}
              maxLength={CHAR_LIMIT}
            ></textarea>
          </div>
          <div className="input-footer">
            <div className="char-counter">
              {inputText.length} / {CHAR_LIMIT} characters
            </div>
            <button className="btn-sample" onClick={handleLoadSample} disabled={isLoading}>
              Try a Sample Project
            </button>
          </div>

          <button 
            className="btn-submit"
            onClick={handleMapStakeholders}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Identifying stakeholders...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                </svg>
                Map Stakeholders
              </>
            )}
          </button>
        </div>

        {/* LOADING STATE DISPLAY */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner spinner-gold"></div>
            <p className="loading-text">Identifying stakeholders...</p>
          </div>
        )}

        {/* RESULTS SECTION (Visible only after mapping is complete) */}
        {!isLoading && stakeholderData && (
          <section className="results-section">
            <div className="results-header-container">
              <div className="results-title-group">
                <span className="results-subtitle">Stakeholder Intelligence Report</span>
                <h2 className="results-title">{stakeholderData.title}</h2>
              </div>
              <button className="btn-export" onClick={handleDownloadReport}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Report
              </button>
            </div>

            {/* TAB BUTTONS */}
            <div className="tabs-nav">
              <button 
                className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                Stakeholder Register
              </button>
              <button 
                className={`tab-btn ${activeTab === "matrix" ? "active" : ""}`}
                onClick={() => setActiveTab("matrix")}
              >
                Power/Interest Matrix
              </button>
              <button 
                className={`tab-btn ${activeTab === "comm" ? "active" : ""}`}
                onClick={() => setActiveTab("comm")}
              >
                Communication Plan
              </button>
              <button 
                className={`tab-btn ${activeTab === "risk" ? "active" : ""}`}
                onClick={() => setActiveTab("risk")}
              >
                Risk Register
              </button>
            </div>

            {/* TAB PANEL CONTENTS */}
            <div className="tab-panel">
              
              {/* TAB 1: STAKEHOLDER REGISTER */}
              {activeTab === "register" && (
                <div className="table-container">
                  <table className="intelligence-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role / Department</th>
                        <th>Stance</th>
                        <th>Influence</th>
                        <th>Interest</th>
                        <th>Key Engagement Strategy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakeholderData.stakeholders.map((sh) => (
                        <tr 
                          key={sh.id} 
                          onClick={() => {
                            setActiveTab("matrix");
                            setSelectedStakeholder(sh);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <td style={{ fontWeight: "700" }}>{sh.name}</td>
                          <td>
                            <div style={{ fontWeight: "600" }}>{sh.role}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                              {sh.department}
                            </div>
                          </td>
                          <td>
                            <span className={`stance-pill ${sh.stance.toLowerCase()}`}>
                              {sh.stance}
                            </span>
                          </td>
                          <td>
                            <span className={`badge-level ${sh.power.toLowerCase()}`}>
                              {sh.power}
                            </span>
                          </td>
                          <td>
                            <span className={`badge-level ${sh.interest.toLowerCase()}`}>
                              {sh.interest}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-secondary)", maxWidth: "320px" }}>
                            {sh.strategy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: POWER/INTEREST MATRIX */}
              {activeTab === "matrix" && (
                <div className="matrix-layout">
                  {/* Visual 2x2 Grid */}
                  <div className="matrix-grid-card">
                    <div className="matrix-container">
                      {/* Axes Grid Guides */}
                      <div className="matrix-quadrant" style={{ borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
                        <span className="quadrant-label">Keep Satisfied</span>
                      </div>
                      <div className="matrix-quadrant" style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <span className="quadrant-label">Manage Closely</span>
                      </div>
                      <div className="matrix-quadrant" style={{ borderRight: "1px solid var(--border-color)" }}>
                        <span className="quadrant-label">Monitor</span>
                      </div>
                      <div className="matrix-quadrant">
                        <span className="quadrant-label">Keep Informed</span>
                      </div>

                      {/* Axes Labels */}
                      <span className="matrix-axis-y">Power →</span>
                      <span className="matrix-axis-x">← Interest →</span>

                      {/* Plotted Stakeholder Dots */}
                      {stakeholderData.stakeholders.map((sh) => {
                        // Map 0-100 coordinates into style percent
                        const leftPos = `${sh.x}%`;
                        // SVG matrix top-down coord (y is power, high power should be at the top)
                        const bottomPos = `${sh.y}%`;

                        // Initials for avatar bubble
                        const initials = sh.name.split(" ").map(n => n[0]).join("").slice(0, 2);

                        return (
                          <div
                            key={sh.id}
                            className="matrix-node"
                            style={{ 
                              left: leftPos, 
                              bottom: bottomPos,
                              backgroundColor: selectedStakeholder?.id === sh.id ? "var(--accent-color)" : "rgba(245, 158, 11, 0.4)",
                              border: selectedStakeholder?.id === sh.id ? "2px solid #ffffff" : "1px solid var(--accent-color)"
                            }}
                            data-initials={initials}
                            title={`${sh.name} (${sh.role})`}
                            onClick={() => setSelectedStakeholder(sh)}
                          ></div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sidebar Detail Card */}
                  <div className="matrix-sidebar">
                    <div className="stakeholder-card-detail active">
                      <span className="detail-label" style={{ color: "var(--accent-color)" }}>Selected Profile</span>
                      {selectedStakeholder ? (
                        <div style={{ marginTop: "1rem" }}>
                          <h3 className="sidebar-heading">{selectedStakeholder.name}</h3>
                          
                          <div className="detail-row">
                            <span className="detail-label">Role</span>
                            <span className="detail-value" style={{ fontWeight: "600" }}>{selectedStakeholder.role}</span>
                          </div>

                          <div className="detail-row">
                            <span className="detail-label">Department</span>
                            <span className="detail-value">{selectedStakeholder.department}</span>
                          </div>

                          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                            <div className="detail-row" style={{ flex: 1 }}>
                              <span className="detail-label">Power Level</span>
                              <div>
                                <span className={`badge-level ${selectedStakeholder.power.toLowerCase()}`}>
                                  {selectedStakeholder.power}
                                </span>
                              </div>
                            </div>
                            <div className="detail-row" style={{ flex: 1 }}>
                              <span className="detail-label">Interest Level</span>
                              <div>
                                <span className={`badge-level ${selectedStakeholder.interest.toLowerCase()}`}>
                                  {selectedStakeholder.interest}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="detail-row">
                            <span className="detail-label">Stance Profile</span>
                            <div>
                              <span className={`stance-pill ${selectedStakeholder.stance.toLowerCase()}`}>
                                {selectedStakeholder.stance}
                              </span>
                            </div>
                          </div>

                          <div className="detail-row">
                            <span className="detail-label">Engagement Strategy</span>
                            <span className="detail-value" style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>
                              {selectedStakeholder.strategy}
                            </span>
                          </div>

                          <div className="detail-row" style={{ marginBottom: 0 }}>
                            <span className="detail-label">Updates Frequency</span>
                            <span className="detail-value" style={{ fontWeight: "600" }}>
                              {selectedStakeholder.frequency}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p style={{ color: "var(--text-secondary)", marginTop: "1rem", fontSize: "0.9rem" }}>
                          Select a stakeholder node on the grid to inspect details.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COMMUNICATION PLAN */}
              {activeTab === "comm" && (
                <div className="table-container">
                  <table className="intelligence-table">
                    <thead>
                      <tr>
                        <th>Communication Activity</th>
                        <th>Target Audience</th>
                        <th>Delivery Channel</th>
                        <th>Frequency</th>
                        <th>Strategic Business Analyst Objective</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakeholderData.communicationPlan.map((comm) => (
                        <tr key={comm.id}>
                          <td style={{ fontWeight: "700" }}>{comm.activity}</td>
                          <td>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                              {comm.stakeholders.map((name, idx) => (
                                <span key={idx} style={{ 
                                  fontSize: "0.75rem", 
                                  backgroundColor: "rgba(255,255,255,0.06)", 
                                  border: "1px solid var(--border-color)", 
                                  padding: "0.15rem 0.4rem", 
                                  borderRadius: "4px",
                                  fontWeight: "600"
                                }}>
                                  {name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td style={{ fontWeight: "600", color: "var(--accent-color)" }}>{comm.channel}</td>
                          <td style={{ fontWeight: "700" }}>{comm.frequency}</td>
                          <td style={{ color: "var(--text-secondary)" }}>{comm.objective}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 4: RISK REGISTER */}
              {activeTab === "risk" && (
                <div className="table-container">
                  <table className="intelligence-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Stakeholder-Related Risk Statement</th>
                        <th>Impact</th>
                        <th>Probability</th>
                        <th>Proactive Mitigation Strategy</th>
                        <th>Response Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakeholderData.riskRegister.map((risk) => (
                        <tr key={risk.id}>
                          <td style={{ fontWeight: "700", color: "var(--accent-color)" }}>{risk.id}</td>
                          <td style={{ fontWeight: "600", maxWidth: "250px" }}>{risk.risk}</td>
                          <td>
                            <span className={`badge-level ${risk.impact.toLowerCase() === "critical" ? "high" : risk.impact.toLowerCase()}`}>
                              {risk.impact}
                            </span>
                          </td>
                          <td>
                            <span className={`badge-level ${risk.probability.toLowerCase()}`}>
                              {risk.probability}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-secondary)", maxWidth: "320px" }}>{risk.mitigation}</td>
                          <td style={{ fontWeight: "700" }}>{risk.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="footer-wrapper">
          <p className="footer-text">
            Built by <a href="#" className="footer-author" onClick={(e) => e.preventDefault()}>Kivaane Anton Uthayakumar</a>
          </p>
          <p className="footer-text">Business Analysis Portfolio Project</p>
        </div>
      </footer>

      {/* CONFIGURE API KEY MODAL */}
      {showApiModal && (
        <div className="modal-overlay" onClick={() => setShowApiModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="btn-modal-close" onClick={() => setShowApiModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3 className="modal-title">Configure API Key</h3>
            <p className="modal-subtitle">
              Securely store your API keys locally in your browser. StakeholderIQ will run standard intelligence models to map decision-makers. Keys are never transmitted to any third-party analytics servers.
            </p>
            <form onSubmit={handleSaveApiKey}>
              <div className="form-group">
                <label className="form-label">Select Provider</label>
                <select className="form-input" style={{ appearance: "none", cursor: "pointer" }}>
                  <option>OpenAI GPT-4o (Recommended)</option>
                  <option>Google Gemini 1.5 Pro</option>
                  <option>Anthropic Claude 3.5 Sonnet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="apiKeyField">API Token</label>
                <input
                  type="password"
                  id="apiKeyField"
                  className="form-input"
                  placeholder="sk-..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                {apiKey && (
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", marginRight: "auto" }}
                    onClick={handleRemoveApiKey}
                  >
                    Remove Key
                  </button>
                )}
                <button type="button" className="btn-cancel" onClick={() => setShowApiModal(false)}>
                  Close
                </button>
                <button type="submit" className="btn-save" disabled={!inputKey.trim()}>
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
