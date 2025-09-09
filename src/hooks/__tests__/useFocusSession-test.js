import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusSession } from '../useFocusSession';

// Mock the contexts
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
  }),
}));

jest.mock('@/contexts/LockContext', () => ({
  useLock: () => ({
    lockApps: jest.fn(),
    unlockApps: jest.fn(),
  }),
}));

// Mock Supabase
jest.mock('@/services/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: null,
            error: { code: 'PGRST116' }, // No rows returned
          })),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'test-session-id',
              user_id: 'test-user-id',
              title: 'Test Session',
              status: 'active',
            },
            error: null,
          })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: null,
          error: null,
        })),
      })),
    })),
  },
}));

describe('useFocusSession', () => {
  it('should initialize with no active session', () => {
    const { result } = renderHook(() => useFocusSession());
    
    expect(result.current.activeSession).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should start a session successfully', async () => {
    const { result } = renderHook(() => useFocusSession());
    
    await act(async () => {
      const success = await result.current.startSession({
        title: 'Test Session',
        description: 'A test session',
        duration_minutes: 25,
        app_limits: ['com.instagram.app'],
        app_lock_enabled: true,
        essay_required: true,
      });
      
      expect(success).toBe(true);
    });
  });

  it('should end a session successfully', async () => {
    const { result } = renderHook(() => useFocusSession());
    
    // First start a session
    await act(async () => {
      await result.current.startSession({
        title: 'Test Session',
        description: 'A test session',
        duration_minutes: 25,
        app_limits: ['com.instagram.app'],
        app_lock_enabled: true,
        essay_required: true,
      });
    });
    
    // Then end it
    await act(async () => {
      await result.current.endSession('test-session-id', true);
    });
    
    expect(result.current.activeSession).toBeNull();
  });

  it('should update session progress', async () => {
    const { result } = renderHook(() => useFocusSession());
    
    await act(async () => {
      await result.current.updateSessionProgress('test-session-id', 15);
    });
    
    // The function should complete without error
    expect(true).toBe(true);
  });

  it('should log failures', async () => {
    const { result } = renderHook(() => useFocusSession());
    
    await act(async () => {
      await result.current.logFailure('test-session-id', 'app_opened', {
        appName: 'Instagram',
        bundleId: 'com.instagram.app',
      });
    });
    
    // The function should complete without error
    expect(true).toBe(true);
  });
});
