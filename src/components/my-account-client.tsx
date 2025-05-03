'use client';

import { useDispatch } from 'react-redux';
import { setUser, UserState } from '@/lib/features/user/user-slice';
import { useEffect } from 'react';

// HACK: 何も表示しない Client Component を使って
// 強引に React Redux にユーザー情報を反映
export const MyAccountClient: React.FC<UserState> = (user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return null;
};
