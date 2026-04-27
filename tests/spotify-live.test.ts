import axios from 'axios';
import { SpotifyService } from '../src/spotify-live';
import { AppConfig } from '../src/config';
import { User } from '../src/user';

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
      slack: {
        clientId: 'slack-id',
        clientSecret: 'slack-secret',
        userToken: '',
        signingSecret: '',
      },
      bot: {
        baseUrl: 'http://localhost:3000',
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':pause:',
        statusFormat: '{song} - {artist}',
        port: 3000,
      },
      db: {
        dialect: 'sqlite',
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: '',
        name: 'test',
      },
    };

    service = new SpotifyService(mockConfig);
    jest.clearAllMocks();
  });

  it('should fetch the currently playing track successfully', async () => {
    const mockUser = {
      id: 'u1',
      spotifyRefreshToken: 'token',
      slackUserId: 'test',
    } as unknown as User;

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: 'new_access_token',
        expires_in: 3600,
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        is_playing: true,
        item: {
          type: 'track',
          name: 'Test Song',
          artists: [{ name: 'Test Artist' }],
        },
      },
    });

    const track = await service.getCurrentlyPlaying(mockUser);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1); // Token refresh
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { Authorization: 'Bearer new_access_token' } },
    );

    expect(track).toEqual({
      isPlaying: true,
      songName: 'Test Song',
      artistName: 'Test Artist',
    });
  });

  it('should use cached tokens if available and valid', async () => {
    const mockUser = { id: 'u1', spotifyRefreshToken: 'token' } as unknown as User;

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

    await service.getCurrentlyPlaying(mockUser); // Triggers refresh
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    await service.getCurrentlyPlaying(mockUser); // Should use cached token
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: 'Bearer new_access_token',
        },
      },
    );
  });

  it('should return null if nothing is playing (204)', async () => {
    const mockUser = { id: 'u1', spotifyRefreshToken: 'token' } as unknown as User;

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: 'new_access_token',
        expires_in: 3600,
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      status: 204,
      data: null,
    });

    const track = await service.getCurrentlyPlaying(mockUser);
    expect(track).toBeNull();
  });
});
