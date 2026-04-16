import { useState } from 'react'
import './App.css'

const seedNotes = [
  {
    id: 'launch-plan',
    title: 'Amplify launch plan',
    category: 'Deployment',
    updatedAt: '2026-04-16 15:40 JST',
    summary:
      'Connect the GitHub repository, select the main branch, and let Amplify Hosting handle the first build.',
    body:
      'This screen replaces the Vite starter so the deployed app has an obvious visual change. After the repository is connected in Amplify Hosting, every push to main should trigger a fresh build automatically.',
  },
  {
    id: 'content-ideas',
    title: 'Release notes',
    category: 'Product',
    updatedAt: '2026-04-16 15:42 JST',
    summary:
      'Capture a visible deploy marker so the latest production revision is easy to confirm from the browser.',
    body:
      'Use the deployment marker below to confirm that Hosting picked up the newest commit. Changing this text and pushing again is the quickest way to verify the continuous deployment pipeline.',
  },
  {
    id: 'daily-rhythm',
    title: 'Daily rhythm',
    category: 'Personal',
    updatedAt: '2026-04-16 15:44 JST',
    summary:
      'Keep the UI simple: write a note, pin the active item, and review it in the reading pane.',
    body:
      'The app keeps everything local in component state for now. That is enough for a deployment check while the Amplify backend scaffold is already tracked in the repository for later expansion.',
  },
]

function App() {
  const [notes, setNotes] = useState(seedNotes)
  const [activeId, setActiveId] = useState(seedNotes[0].id)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')

  const activeNote = notes.find((note) => note.id === activeId) ?? notes[0]
  const deploymentMarker = 'deploy-check-2026-04-16-a'

  const handleCreateNote = () => {
    const title = draftTitle.trim()
    const body = draftBody.trim()

    if (!title || !body) {
      return
    }

    const newNote = {
      id: `note-${Date.now()}`,
      title,
      category: 'Draft',
      updatedAt: 'Just now',
      summary: body.slice(0, 88),
      body,
    }

    setNotes((currentNotes) => [newNote, ...currentNotes])
    setActiveId(newNote.id)
    setDraftTitle('')
    setDraftBody('')
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="eyebrow-row">
          <span className="eyebrow">Notes App</span>
          <span className="status-pill">Amplify Hosting ready</span>
        </div>
        <h1>Ship the React app, then let each push redeploy it.</h1>
        <p className="hero-copy">
          The repository now includes the Amplify backend scaffold and a visible
          UI update, so the first deployment and the next auto-deployment are
          both easy to verify.
        </p>

        <div className="hero-metrics">
          <article>
            <span className="metric-label">Deployment marker</span>
            <strong>{deploymentMarker}</strong>
          </article>
          <article>
            <span className="metric-label">Tracked branch</span>
            <strong>main</strong>
          </article>
          <article>
            <span className="metric-label">Notes in view</span>
            <strong>{notes.length}</strong>
          </article>
        </div>
      </section>

      <section className="workspace">
        <aside className="composer-card">
          <div className="card-heading">
            <span className="section-kicker">Quick capture</span>
            <h2>Write a note</h2>
          </div>

          <label className="field">
            <span>Title</span>
            <input
              type="text"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="Deployment checklist"
            />
          </label>

          <label className="field">
            <span>Body</span>
            <textarea
              value={draftBody}
              onChange={(event) => setDraftBody(event.target.value)}
              placeholder="Record the next UI change you want Amplify to publish."
              rows="6"
            />
          </label>

          <button className="primary-button" onClick={handleCreateNote}>
            Add note
          </button>
        </aside>

        <section className="notes-card">
          <div className="card-heading">
            <span className="section-kicker">Board</span>
            <h2>Recent notes</h2>
          </div>

          <div className="note-list">
            {notes.map((note) => {
              const isActive = note.id === activeId

              return (
                <button
                  key={note.id}
                  type="button"
                  className={`note-item${isActive ? ' active' : ''}`}
                  onClick={() => setActiveId(note.id)}
                >
                  <span className="note-meta">
                    <span>{note.category}</span>
                    <span>{note.updatedAt}</span>
                  </span>
                  <strong>{note.title}</strong>
                  <p>{note.summary}</p>
                </button>
              )
            })}
          </div>
        </section>
      </section>

      <section className="preview-card">
        <div className="card-heading">
          <span className="section-kicker">Preview</span>
          <h2>{activeNote.title}</h2>
        </div>
        <div className="preview-meta">
          <span>{activeNote.category}</span>
          <span>{activeNote.updatedAt}</span>
        </div>
        <p className="preview-body">{activeNote.body}</p>
      </section>
    </main>
  )
}

export default App
