import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useContentItems } from '../hooks/useContentItems';
import image1 from '../assets/images/img34.png';
import image2 from '../assets/images/img35.png';
import image3 from '../assets/images/img36.png';

function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function eventSlug(event, index) {
  if (event?.meta?.slug) return event.meta.slug;
  const base = slugify(event?.title) || `event-${index + 1}`;
  if (event?.id) {
    const short = String(event.id).split('-')[0];
    return `${base}-${short}`;
  }
  return base;
}

function toHtml(content) {
  const value = String(content || '');
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

const fallbackEvents = [
  { title: 'Hackathon for Health', subtitle: 'November 10th, 2026', description: 'Join our virtual hackathon where participants collaborate on digital menstrual health solutions.', image_url: image1, tag: 'upcoming', sort_order: 0, link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform', meta: { location: 'Virtual', buttonText: 'Register Now', color: 'primary' } },
  { title: 'Poster & Mascot Design Competition', subtitle: 'October 25th, 2026', description: 'Unleash your creativity and design campaign mascot/poster to raise awareness.', image_url: image2, tag: 'active', sort_order: 1, link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform', meta: { location: 'Open to all (Submit online)', buttonText: 'Submit Your Design', color: 'secondary' } },
  { title: 'Storytelling and Short Film Festival', subtitle: 'December 15th, 2026', description: 'Share compelling stories around menstrual health and social stigma via short films.', image_url: image3, tag: 'upcoming', sort_order: 2, link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform', meta: { location: 'Online and In-Person', buttonText: 'Submit Your Film', color: 'accent' } },
];

const CompetitionEventDetail = () => {
  const { eventSlug: slugParam } = useParams();
  const { items } = useContentItems({
    page: 'Compitionevent',
    section: 'competition_events',
    fallback: fallbackEvents,
  });
  const event = (items || []).find((it, idx) => eventSlug(it, idx) === slugParam);
  const [form, setForm] = useState({ name: '', email: '', phone: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <Wrap>
        <h1>Event not found</h1>
        <Link to="/Compitionevent" className="back-link">Back to Events</Link>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Link to="/Compitionevent" className="back-link">← Back to Events</Link>
      <img className="hero-image" src={event.image_url || image1} alt={event.title} />
      <h1>{event.title}</h1>
      <div className="meta">{event.subtitle} • {event.meta?.location || 'TBA'} • {(event.tag || 'upcoming').toUpperCase()}</div>
      <div className="desc" dangerouslySetInnerHTML={{ __html: toHtml(event.description) }} />

      <div className="form-card">
        <h3>Event Detail Form</h3>
        <p>Fill details to update/submit event related information.</p>
        <div className="form-grid">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          <textarea rows="5" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Related details" />
          <button
            type="button"
            onClick={() => setSubmitted(true)}
          >
            Submit
          </button>
        </div>
        {submitted && <div className="msg">Submitted successfully.</div>}
        {event.link_url ? (
          <a className="external-btn" href={event.link_url} target="_blank" rel="noopener noreferrer">
            Open Registration Link
          </a>
        ) : null}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) var(--space-16);
  .back-link { color: var(--color-primary-700); font-weight: 600; display: inline-block; margin-bottom: var(--space-4); }
  .hero-image { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius-2xl); margin-bottom: var(--space-5); }
  h1 { font-family: var(--font-heading); margin-bottom: var(--space-2); }
  .meta { color: var(--color-dark-500); margin-bottom: var(--space-4); }
  .desc { color: var(--color-dark-600); line-height: 1.8; margin-bottom: var(--space-8); }
  .form-card { border: 1px solid var(--color-dark-100); background: #fff; border-radius: var(--radius-2xl); padding: var(--space-5); }
  .form-grid { display: grid; gap: var(--space-3); }
  input, textarea { padding: var(--space-3) var(--space-4); border: 1px solid var(--color-dark-200); border-radius: var(--radius-lg); background: #f9fafb; }
  button, .external-btn { width: fit-content; padding: var(--space-3) var(--space-5); border-radius: var(--radius-full); background: var(--gradient-primary); color: #fff; font-weight: 600; }
  .external-btn { display: inline-flex; margin-top: var(--space-3); }
  .msg { margin-top: var(--space-2); color: var(--color-secondary-700); font-weight: 600; }
`;

export default CompetitionEventDetail;
