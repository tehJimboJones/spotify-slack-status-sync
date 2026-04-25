import axios from 'axios';
import { SpotifyService } from '../src/spotify-live';
import { AppConfig } from '../src/config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Live SpotifyService', () => {
  let mockConfig: AppConfig;
  let service: SpotifyService;

  beforeEach(() => {
    mockConfig = {
      spotify: {
        clientId: 'test_client',
        clientSecret: 'test_secret',
        redirectUri: 'uri',
        refreshToken: 'test_refresh_token',
      },
      slack: { userToken: '', signingSecret: '' },
      bot: {
        pollIntervalMs: 60000,
        statusEmoji: '',
        pausedEmoji: '',
        statusFormat: '',
      },
    };

    service = new SpotifyService(mockConfig);
    jest.clearAllMocks();
  });

  it('should refresh the access token and return playing track', async () => {
    // Mock token refresh response
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: 'new_access_token',
        expires_in: 3600,
      },
    });

    // Mock currently playing response
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        is_playing: true,
        item: {
          type: 'track',
          name: 'Live Song',
          artists: [{ name: 'Live Artist' }],
        },
      },
    });

    const state = await service.getCurrentlyPlaying();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1); // Token refresh
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { Authorization: 'Bearer new_access_token' } },
    );

    expect(state).toEqual({
      isPlaying: true,
      songName: 'Live Song',
      artistName: 'Live Artist',
    });
  });

  it('should not refresh token if it is still valid', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'new_access_token', expires_in: 3600 },
    });
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        is_playing: false,
        item: { type: 'track', name: 'Song', artists: [{ name: 'Art' }] },
      },
    });

    await service.getCurrentlyPlaying(); // Triggers refresh
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    await service.getCurrentlyPlaying(); // Should use cached token
    expect(mockedAxios.post).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should return null when status is 204 (stopped)', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'new_access_token', expires_in: 3600 },
    });
    mockedAxios.get.mockResolvedValueOnce({ status: 204 });

    const state = await service.getCurrentlyPlaying();
    expect(state).toBeNull();
  });
});
