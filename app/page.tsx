'use client';

import { FormEvent, useState } from 'react';

const initialForm = {
  email: '',
  reason: '',
  source: 'newsletter',
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [record, setRecord] = useState<Record<string, string> | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to process unsubscribe request.');
      }

      setStatus('success');
      setMessage(data.message);
      setRecord(data.data ?? null);
      setForm(initialForm);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something unexpected happened.';
      setStatus('error');
      setMessage(errorMessage);
    }
  }

  return (
    <main className="page-shell">
      <section className="card" aria-labelledby="title">
        <div className="eyebrow">Adobe Journey Optimizer</div>
        <h1 id="title">Unsubscribe Center</h1>
        <p className="lead">
          Test a one-click unsubscribe flow with validation, logging, and a clean API contract.
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Reason</span>
            <textarea
              name="reason"
              value={form.reason}
              onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
              placeholder="I no longer want to receive these emails"
              required
            />
          </label>

          <label>
            <span>Source</span>
            <select
              name="source"
              value={form.source}
              onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
            >
              <option value="newsletter">Newsletter</option>
              <option value="product">Product updates</option>
              <option value="transactional">Transactional</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
          </button>
        </form>

        {message ? (
          <div className={`status ${status}`} role="status" aria-live="polite">
            {message}
          </div>
        ) : null}

        {record ? (
          <div className="result">
            <h2>Request summary</h2>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>{record.email}</dd>
              </div>
              <div>
                <dt>Reason</dt>
                <dd>{record.reason}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{record.source}</dd>
              </div>
              <div>
                <dt>Processed</dt>
                <dd>{record.timestamp}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        <div className="api-anchor">
          <span>API endpoint</span>
          <code>/api/unsubscribe</code>
        </div>
      </section>
    </main>
  );
}
