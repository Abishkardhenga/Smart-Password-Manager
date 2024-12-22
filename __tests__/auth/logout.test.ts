import { logout } from '@/configs/Authentication.config';
import { auth } from '@/configs/Firebase.config';
import { signOut } from 'firebase/auth';

jest.mock('firebase/auth');

describe('logout function', () => {
  it('should log out the user successfully', async () => {
    (signOut as jest.Mock).mockResolvedValue(null);

    const result = await logout();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(result).toBe(true);
  });

  it('should return false if logout fails', async () => {
    const mockError = new Error('Logout failed');

    (auth.signOut as jest.Mock).mockRejectedValue(mockError);

    const result = await logout();

    expect(result).toBe(false);
  });
});
