import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../slices/authSlice';

interface RefreshResponse {
  token: string;
  user: any;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gearupserver.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { token, user, refreshToken: newRefreshToken } = refreshResult.data as RefreshResponse;
      api.dispatch(setUser({ user, token, refreshToken: newRefreshToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['products', 'orders'],
  endpoints: () => ({}),
});
