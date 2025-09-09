import React from 'react';
import renderer from 'react-test-renderer';
import { SessionCard } from '../ui/SessionCard';

const mockSession = {
  id: '1',
  user_id: 'user1',
  title: 'Test Focus Session',
  description: 'A test session for focus',
  duration_minutes: 25,
  scheduled_at: '2024-01-01T10:00:00Z',
  started_at: null,
  ended_at: null,
  total_focus_time: 0,
  status: 'scheduled',
  app_limits: ['com.instagram.app'],
  app_lock_enabled: true,
  essay_required: true,
  essay_content: null,
  essay_word_count: 0,
  created_at: '2024-01-01T09:00:00Z',
  updated_at: '2024-01-01T09:00:00Z',
};

describe('SessionCard', () => {
  it('renders correctly with basic session data', () => {
    const tree = renderer.create(
      <SessionCard session={mockSession} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with actions enabled', () => {
    const tree = renderer.create(
      <SessionCard 
        session={mockSession} 
        showActions={true}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with active session', () => {
    const activeSession = {
      ...mockSession,
      status: 'active',
      started_at: '2024-01-01T10:00:00Z',
      total_focus_time: 15,
    };

    const tree = renderer.create(
      <SessionCard session={activeSession} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with completed session', () => {
    const completedSession = {
      ...mockSession,
      status: 'completed',
      started_at: '2024-01-01T10:00:00Z',
      ended_at: '2024-01-01T10:25:00Z',
      total_focus_time: 25,
    };

    const tree = renderer.create(
      <SessionCard session={completedSession} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with failed session', () => {
    const failedSession = {
      ...mockSession,
      status: 'failed',
      started_at: '2024-01-01T10:00:00Z',
      ended_at: '2024-01-01T10:10:00Z',
      total_focus_time: 10,
    };

    const tree = renderer.create(
      <SessionCard session={failedSession} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
